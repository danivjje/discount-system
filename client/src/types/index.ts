import { userScheme, customerScheme, configScheme, loginFormScheme, enrollBonusesFormScheme } from '@/schemes';
import z from 'zod';

export type Customer = z.infer<typeof customerScheme>;
export type User = z.infer<typeof userScheme>;
export type AppConfig = z.infer<typeof configScheme>;

export type LoginForm = z.infer<typeof loginFormScheme>;
export type EnrollBonusesForm = z.infer<typeof enrollBonusesFormScheme>;
