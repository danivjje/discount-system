import type { AppConfig, EnrollBonusesForm } from '@/types';

const API_LINK: string = 'http://localhost:3000/api';

export const getUsers = async () => {
  const response = await fetch(`${API_LINK}/customers`);
  return await response.json();
};

export const getUser = async (phone: string) => {
  const response = await fetch(`${API_LINK}/customers/${phone}`);
  return await response.json();
};

export const postUser = async (data: EnrollBonusesForm) => {
  const response = await fetch(`${API_LINK}/customers`, {
    method: 'post',
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getSettings = async () => {
  const response = await fetch(`${API_LINK}/config`);
  return await response.json();
};

export const updateSettings = async (data: AppConfig) => {
  const response = await fetch(`${API_LINK}/config`, {
    method: 'post',
    body: JSON.stringify(data),
  });
  return await response.json();
};
