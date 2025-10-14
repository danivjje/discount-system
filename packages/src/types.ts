import z from 'zod';
import {
  configScheme,
  countBonusesFormScheme,
  customerScheme,
  fullConfigScheme,
  getCustomersScheme,
  loginFormScheme,
  upsertCustomerFormScheme,
  userScheme,
} from './schemes';

export type User = z.infer<typeof userScheme>;

export type Customer = z.infer<typeof customerScheme>;
export type GetCustomersResponse = z.infer<typeof getCustomersScheme>;
export type UpsertCustomerFormScheme = z.infer<typeof upsertCustomerFormScheme>;

export type Config = z.infer<typeof configScheme>;
export type FullConfig = z.infer<typeof fullConfigScheme>;

export type CountBonusesFormScheme = z.infer<typeof countBonusesFormScheme>;
export type LoginFormScheme = z.infer<typeof loginFormScheme>;
