import z from 'zod';

import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { customersTable, usersTable, appConfigTable } from './db/schema';

export const phoneScheme = z.string().length(12);

export const loginFormScheme = z.object({
  username: z.string().min(3).max(16),
  password: z.string().min(6).max(30),
});

export const userScheme = createSelectSchema(usersTable).omit({ password: true });

export const checkUserScheme = userScheme.omit({ id: true });

export const customerScheme = createSelectSchema(customersTable);

export const upsertCustomerFormScheme = z.object({
  phone: phoneScheme,
  sum: z.number(),
});

export const configScheme = createSelectSchema(appConfigTable);
export const postConfigScheme = createInsertSchema(appConfigTable);

export const countBonusesFormScheme = z.object({
  phone: z.string().length(12),
  sum: z.number(),
});

// export const userScheme = z.object({
//   id: z.number(),
//   username: z.string().min(3).max(15),
// });

// export const checkUserScheme = z.object({
//   username: z.string().min(3).max(15),
// });

// export const customerScheme = z.object({
//   id: z.number(),
//   phone: phoneScheme,
//   bonuses: z.number(),
//   totalSum: z.number(),
// });

// export const postConfigScheme = z.object({
//   key: z.string().nonempty(),
//   value: z.union([z.string(), z.number(), z.boolean()]),
// });

// export const configScheme = postConfigScheme.extend({
//   id: z.number(),
// });
