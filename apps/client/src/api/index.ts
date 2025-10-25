import type { RequestOptions } from '@/types';
import { userScheme, configScheme, customerScheme } from '@packages/schemes';
import type { AppConfig, Customer, LoginForm, SafeUser } from '@packages/types';
import { z, type ZodSchema } from 'zod';

const API_LINK: string = 'http://localhost:3000/api';

const generateRequestOptions = (method: 'get' | 'post' | 'patch', json: boolean, data?: unknown): RequestOptions => {
  const options: RequestOptions = { method, credentials: 'include' };

  if (json) options.headers = { 'Content-Type': 'application/json' };
  if (data) options.body = JSON.stringify(data);

  return options;
};

const parseData = <T extends ZodSchema>(scheme: T, data: unknown): z.infer<T> => {
  try {
    return scheme.parse(data);
  } catch (err) {
    throw err;
  }
};

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_LINK}/customers`, generateRequestOptions('get', false));
  const data = await response.json();
  return parseData(z.array(customerScheme), data);
};

export const getCustomer = async (phone: string): Promise<Customer> => {
  const response = await fetch(`${API_LINK}/customers/${phone}`, generateRequestOptions('get', false));
  const data = await response.json();
  return parseData(customerScheme, data);
};

export const postCustomer = async (customerData: { phone: string; sum: number }): Promise<Customer> => {
  const response = await fetch(`${API_LINK}/customers`, generateRequestOptions('post', true, customerData));
  const data = await response.json();
  return parseData(customerScheme, data);
};

export const patchCustomerResetBonuses = async (phone: string): Promise<Customer> => {
  const response = await fetch(`${API_LINK}/customers/${phone}/reset-bonuses`, generateRequestOptions('patch', true));
  const data = await response.json();
  return parseData(customerScheme, data);
};

export const getConfig = async (): Promise<AppConfig[]> => {
  const response = await fetch(`${API_LINK}/config`, generateRequestOptions('get', false));
  const data = await response.json();
  return parseData(z.array(configScheme), data);
};

export const postConfig = async (configData: AppConfig[]): Promise<AppConfig[]> => {
  const response = await fetch(`${API_LINK}/config`, generateRequestOptions('post', true, configData));
  const data = await response.json();
  return parseData(z.array(configScheme), data);
};

export const authLoginUser = async (loginData: LoginForm): Promise<boolean> => {
  const response = await fetch(`${API_LINK}/auth/login`, generateRequestOptions('post', true, loginData));
  return response.ok;
};

export const authCheckUser = async (): Promise<SafeUser | void> => {
  const response = await fetch(`${API_LINK}/auth/check`, generateRequestOptions('get', false));
  const data = await response.json();
  if (response.ok) return parseData(userScheme, data);
};
