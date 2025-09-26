import type { AppConfig, AuthUserForm, Customer, User } from '@/types';

const API_LINK: string = 'http://localhost:3000/api';

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_LINK}/customers`);
  return await response.json();
};

export const getCustomer = async (phone: string): Promise<Customer> => {
  const response = await fetch(`${API_LINK}/customers/${phone}`);
  return await response.json();
};

export const postCustomer = async (phone: string, data: { sum: number }): Promise<Customer> => {
  const response = await fetch(`${API_LINK}/customers/${phone}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const patchCustomerResetBonuses = async (phone: string): Promise<Customer> => {
  const response = await fetch(`${API_LINK}/customers/${phone}/reset-bonuses`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
  return await response.json();
};

export const getConfig = async (): Promise<AppConfig[]> => {
  const response = await fetch(`${API_LINK}/config`);
  return await response.json();
};

export const postConfig = async (data: AppConfig[]): Promise<AppConfig> => {
  const response = await fetch(`${API_LINK}/config`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const authLoginUser = async (data: AuthUserForm): Promise<User> => {
  const response = await fetch(`${API_LINK}/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const authCheckUser = async (): Promise<User> => {
  const response = await fetch(`${API_LINK}/auth/check`);
  return await response.json();
};
