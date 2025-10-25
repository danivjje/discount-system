import z from 'zod';

const string = z.string('Поле должно быть текстовым значением');
const number = z.number('Поле должно быть числом');

const userUsername = string
  .min(3, 'Поле должно содержать 3+ символов')
  .max(16, 'Поле не должно содержать больше 16 символов');

export const phoneScheme = string.length(12, 'Номер должен содержать 12 символов');

export const loginFormScheme = z.object({
  username: userUsername,
  password: string.min(6, 'Поле должно содержать 6+ символов').max(30, 'Поле не должно содержать больше 30 символов'),
});

export const userScheme = z.object({
  id: number,
  username: userUsername,
});

export const checkUserScheme = userScheme.omit({ id: true });

export const customerScheme = z.object({
  id: number,
  phone: phoneScheme,
  bonuses: number,
  totalSum: number,
});

export const upsertCustomerFormScheme = z.object({
  phone: phoneScheme,
  sum: number,
});

export const postConfigScheme = z.object({
  key: string.nonempty('Поле не должно быть пустым'),
  value: z.union([string, number, z.boolean()]),
});

export const configScheme = postConfigScheme.extend({
  id: number,
});

export const countBonusesFormScheme = z.object({
  phone: phoneScheme,
  sum: number,
});

export const configBonusPercentValueScheme = number.min(0, 'Число должно быть не меньше нуля');
