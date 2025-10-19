import {
  getConfigScheme,
  postConfigScheme,
  getCustomerScheme,
  upsertCustomerFormScheme,
  loginFormScheme,
  phoneScheme,
  userScheme,
} from '@packages/schemes';
import type { AppConfig, Customer, LoginForm, SafeUser } from '@packages/types';
import { z, type ZodSchema } from 'zod';

const API_LINK: string = 'http://localhost:3000/api';

const parseData = <T extends ZodSchema>(scheme: T, data: unknown): z.infer<T> => {
  try {
    return scheme.parse(data);
  } catch (err) {
    throw err;
  }
};

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_LINK}/customers`);
  const data = await response.json();
  return parseData(z.array(getCustomerScheme), data);
};

export const getCustomer = async (phone: string): Promise<Customer> => {
  parseData(phoneScheme, phone);
  const response = await fetch(`${API_LINK}/customers/${phone}`);
  const data = await response.json();
  return parseData(getCustomerScheme, data);
};

export const postCustomer = async (customerData: { phone: string; sum: number }): Promise<Customer> => {
  parseData(upsertCustomerFormScheme, customerData);
  const response = await fetch(`${API_LINK}/customers/${customerData.phone}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(customerData),
  });
  const data = await response.json();
  return parseData(getCustomerScheme, data);
};

export const patchCustomerResetBonuses = async (phone: string): Promise<Customer> => {
  parseData(phoneScheme, phone);
  const response = await fetch(`${API_LINK}/customers/${phone}/reset-bonuses`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
  const data = await response.json();
  return parseData(getCustomerScheme, data);
};

export const getConfig = async (): Promise<AppConfig[]> => {
  const response = await fetch(`${API_LINK}/config`);
  const data = await response.json();
  return parseData(getConfigScheme, data);
};

export const postConfig = async (configData: AppConfig[]): Promise<AppConfig[]> => {
  parseData(postConfigScheme, configData);
  const response = await fetch(`${API_LINK}/config`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(configData),
  });
  const data = await response.json();
  return parseData(getConfigScheme, data);
};

export const authLoginUser = async (loginData: LoginForm): Promise<string | {}> => {
  parseData(loginFormScheme, loginData);
  const response = await fetch(`${API_LINK}/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(loginData),
  });
  return await response.json();
};

export const authCheckUser = async (): Promise<SafeUser> => {
  const response = await fetch(`${API_LINK}/auth/check`);
  const data = await response.json();
  return parseData(userScheme, data);
};
