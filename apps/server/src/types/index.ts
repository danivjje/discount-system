import { SortField, SortOrder } from '@packages/types';
import { JwtPayload } from 'jsonwebtoken';

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

export interface JwtCustomPayload extends JwtPayload {
  id: number;
  username: string;
}
