import type { AppConfig, Customer, EnrollBonusesForm } from '@/types';

const API_LINK: string = 'http://localhost:3000/api';

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_LINK}/customers`);
  return await response.json();
};

export const getCustomer = async (phone: string): Promise<Customer> => {
  const response = await fetch(`${API_LINK}/customers/${phone}`);
  return await response.json();
};

export const postCustomer = async (data: EnrollBonusesForm): Promise<Customer> => {
  const response = await fetch(`${API_LINK}/customers`, {
    method: 'post',
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getConfig = async (): Promise<AppConfig> => {
  const response = await fetch(`${API_LINK}/config`);
  return await response.json();
};

export const postConfig = async (data: AppConfig): Promise<AppConfig> => {
  const response = await fetch(`${API_LINK}/config`, {
    method: 'post',
    body: JSON.stringify(data),
  });
  return await response.json();
};
