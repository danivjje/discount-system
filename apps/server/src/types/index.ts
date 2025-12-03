import { Customer } from '@packages/types';

export type SortOrder = 'asc' | 'desc';
export type SortField = 'bonuses' | 'totalSum';

export interface GetCustomersQuery {
  page?: string;
  phone?: string;
  sort?: SortField;
  order?: SortOrder;
}

export interface NormalizedGetCustomersQuery {
  page: number;
  phone?: string;
  sort?: SortField;
  order?: SortOrder;
}

export interface GetCustomersResponse {
  customers: Customer[];
  total: number;
  page: number;
}
