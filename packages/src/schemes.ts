import z, { config } from 'zod';
import { Prisma } from './database/generated/prisma/client';

export const phoneScheme = z.string().length(12);

export const loginFormScheme = z.object({
  username: z.string().min(3).max(15),
  password: z.string().min(6).max(30),
});

export const userScheme = z.object({
  id: z.number(),
  username: z.string().min(3).max(15),
});

export const customerScheme = z.object({
  id: z.number(),
  phone: phoneScheme,
  bonuses: z.instanceof(Prisma.Decimal),
  totalSum: z.instanceof(Prisma.Decimal),
});

export const getCustomerScheme = customerScheme.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const upsertCustomerFormScheme = z.object({
  phone: phoneScheme,
  sum: z.number(),
});

export const configScheme = z.object({
  id: z.number(),
  key: z.string().nonempty(),
  value: z.union([z.string(), z.number(), z.boolean()]),
});

export const getConfigScheme = z.array(configScheme);

export const postConfigScheme = z.array(configScheme);

export const countBonusesFormScheme = z.object({
  phone: z.string().length(12),
  sum: z.number(),
});
