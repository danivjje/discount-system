import z from 'zod';
export const phoneScheme = z.string().length(12);

export const loginFormScheme = z.object({
  username: z.string().min(3).max(15),
  password: z.string().min(6).max(30),
});

export const userScheme = z.object({
  id: z.number(),
  username: z.string().min(3).max(15),
});

export const checkUserScheme = z.object({
  username: z.string().min(3).max(15),
});

export const customerScheme = z.object({
  id: z.number(),
  phone: phoneScheme,
  bonuses: z.number(),
  totalSum: z.number(),
});

export const upsertCustomerFormScheme = z.object({
  phone: phoneScheme,
  sum: z.number(),
});

export const postConfigScheme = z.object({
  key: z.string().nonempty(),
  value: z.union([z.string(), z.number(), z.boolean()]),
});

export const configScheme = postConfigScheme.extend({
  id: z.number(),
});
export const countBonusesFormScheme = z.object({
  phone: z.string().length(12),
  sum: z.number(),
});
