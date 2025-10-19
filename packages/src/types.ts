import z from 'zod';
import type * as PrismaTypes from './database/generated/prisma/models';
import { countBonusesFormScheme, loginFormScheme } from './schemes';

// export type CountBonusesFormScheme = z.infer<typeof countBonusesFormScheme>;

export type User = PrismaTypes.UserModel;
export type SafeUser = Omit<User, 'password'>;
export type Customer = PrismaTypes.CustomerModel;
export type AppConfig = PrismaTypes.AppConfigModel;

export type LoginForm = z.infer<typeof loginFormScheme>;
export type CountBonusesForm = z.infer<typeof countBonusesFormScheme>;
