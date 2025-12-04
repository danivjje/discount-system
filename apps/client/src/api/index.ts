import ky from 'ky';
import { type ZodSchema, z } from 'zod';
import { userScheme, configScheme, customerScheme, phoneScheme, getCustomersScheme } from '@packages/schemes';
import type { AppConfig, Customer, GetCustomersResponse, LoginForm, SafeUser, SortParam } from '@packages/types';

const api = ky.create({
  prefixUrl: 'http://localhost:3000/api/',
  credentials: 'include',
  retry: {
    limit: 2,
    methods: ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'connect', 'trace'],
    statusCodes: [500, 501, 502, 503, 504, 505, 506, 507, 508],
  },
  hooks: {
    beforeError: [
      async (error, _state) => {
        return error;
      },
    ],
  },
});

const parseData = <T extends ZodSchema>(scheme: T, data: unknown): z.infer<T> => {
  try {
    return scheme.parse(data);
  } catch (err) {
    throw err;
  }
};

export const getCustomers = async (
  page: number,
  searchPhone?: string,
  sort?: SortParam,
): Promise<GetCustomersResponse> => {
  let url: string = `customers?page=${page}`;
  if (searchPhone) url += `&phone=${searchPhone}`;
  if (sort) url += `&sort=${sort.sort}&order=${sort.order}`;

  const data = await api.get(url).json();
  return parseData(getCustomersScheme, data);
};

export const getCustomer = async (phone: string): Promise<Customer> => {
  const data = await api.get('customers/' + phone).json();
  return parseData(customerScheme, data);
};

export const postCustomer = async (customerData: { phone: string; sum: number }): Promise<Customer> => {
  const data = await api
    .post('customers', {
      json: customerData,
    })
    .json();
  return parseData(customerScheme, data);
};

export const patchCustomerResetBonuses = async (phone: string): Promise<{ phone: string }> => {
  const data = await api.patch('customers/' + phone + '/reset-bonuses').json();
  return parseData(z.object({ phone: phoneScheme }), data);
};

export const getConfig = async (): Promise<AppConfig[]> => {
  const data = await api.get('config').json();
  return parseData(z.array(configScheme), data);
};

export const postConfig = async (configData: AppConfig[]): Promise<AppConfig[]> => {
  const data = await api.post('config', { json: configData }).json();
  return parseData(z.array(configScheme), data);
};

export const authLoginUser = async (loginData: LoginForm): Promise<boolean> => {
  return (await api.post('auth/login', { json: loginData })).ok;
};

export const authCheckUser = async (): Promise<SafeUser | void> => {
  const data = await api.get('auth/check');
  if (data.ok) return parseData(userScheme, await data.json());
};
