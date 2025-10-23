import z from 'zod';
import { countBonusesFormScheme, loginFormScheme } from './schemes';
import { usersTable, customersTable, appConfigTable } from './db/schema';

export type User = typeof usersTable.$inferSelect;
export type SafeUser = Omit<User, 'password'>;

export type Customer = typeof customersTable.$inferSelect;

export type AppConfig = typeof appConfigTable.$inferSelect;
export type CreateAppConfig = typeof appConfigTable.$inferInsert;
export type AppConfigValue = string | number | boolean;

export type LoginForm = z.infer<typeof loginFormScheme>;
export type CountBonusesForm = z.infer<typeof countBonusesFormScheme>;

export type ApiErrorType = 'server' | 'validation' | 'notFound' | 'unauthorized';
export interface ApiError<T> {
  type: ApiErrorType;
  code: number;
  message: string;
  details?: T;
}
