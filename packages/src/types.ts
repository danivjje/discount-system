import z from 'zod';
import {
  configBonusPercentScheme,
  configScheme,
  countBonusesFormScheme,
  createConfigScheme,
  getCustomersScheme,
  loginFormScheme,
} from './schemes';
import { usersTable, customersTable, appConfigTable, refreshTokensTable, verificationCodesTable } from './db/schema';

export type User = typeof usersTable.$inferSelect;
export type SafeUser = Omit<User, 'password'>;

export type Customer = typeof customersTable.$inferSelect;
export type GetCustomersResponse = z.infer<typeof getCustomersScheme>;

export type AppConfig = typeof appConfigTable.$inferSelect;
export type CurrentAppConfig = z.infer<typeof configScheme>;
export type CreateCurrentAppConfig = z.infer<typeof createConfigScheme>;

export type BonusPercentConfig = z.infer<typeof configBonusPercentScheme>;

export type LoginForm = z.infer<typeof loginFormScheme>;
export type CountBonusesForm = z.infer<typeof countBonusesFormScheme>;

export type RefreshToken = typeof refreshTokensTable.$inferSelect;

export type VerificationCode = typeof verificationCodesTable.$inferInsert;

export interface LoginResponse {
  refreshToken: string;
  sessionToken: string;
}

export type ApiErrorType = 'server' | 'validation' | 'notFound' | 'unauthorized' | 'forbidden';

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
