import {
  customerScheme,
  getConfigScheme,
  getCustomersScheme,
  loginFormScheme,
  phoneScheme,
  postConfigScheme,
  postCustomerScheme,
  userScheme,
} from '@/schemes';
import type { AppConfig, LoginForm, Customer, User } from '@/types';
import type { z, ZodSchema } from 'zod';

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
  return parseData(getCustomersScheme, data);
};

export const getCustomer = async (phone: string): Promise<Customer> => {
  parseData(phoneScheme, phone);
  const response = await fetch(`${API_LINK}/customers/${phone}`);
  const data = await response.json();
  return parseData(customerScheme, data);
};

export const postCustomer = async (customerData: { phone: string; sum: number }): Promise<Customer> => {
  parseData(postCustomerScheme, customerData);
  const response = await fetch(`${API_LINK}/customers/${customerData.phone}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(customerData),
  });
  const data = await response.json();
  return parseData(customerScheme, data);
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
  return parseData(customerScheme, data);
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

export const authLoginUser = async (loginData: LoginForm): Promise<void> => {
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

export const authCheckUser = async (): Promise<User> => {
  const response = await fetch(`${API_LINK}/auth/check`);
  const data = await response.json();
  return parseData(userScheme, data);
};
