import z from 'zod';
import {
  configBonusPercentScheme,
  configScheme,
  countBonusesFormScheme,
  createConfigScheme,
  getCustomersScheme,
  loginFormScheme,
} from './schemes.js';
import type { User, Customer, AppConfig, RefreshToken, VerificationCode } from '@packages/db';

export type { User, Customer, AppConfig, RefreshToken, VerificationCode };

export type SafeUser = Omit<User, 'password'>;

export type GetCustomersResponse = z.infer<typeof getCustomersScheme>;

export type CurrentAppConfig = z.infer<typeof configScheme>;
export type CreateCurrentAppConfig = z.infer<typeof createConfigScheme>;

export type BonusPercentConfig = z.infer<typeof configBonusPercentScheme>;

export type LoginForm = z.infer<typeof loginFormScheme>;
export type CountBonusesForm = z.infer<typeof countBonusesFormScheme>;

export interface LoginResponse {
  refreshToken: string;
  sessionToken: string;
}

export type ApiErrorType = 'server' | 'validation' | 'notFound' | 'unauthorized' | 'forbidden' | 'unprocessableContent';

export interface ApiError<T> {
  type: ApiErrorType;
  code: number;
  message: string;
  details?: T;
}

export type SortOrder = 'asc' | 'desc';
export type SortField = 'bonuses' | 'totalSum';
export interface SortParam {
  sort: SortField;
  order: SortOrder;
}
