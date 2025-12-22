import z from 'zod';

// common schemes

const string = z.string('Поле должно быть текстовым значением');
const number = z.number('Поле должно быть числом');

const userUsername = string
  .min(3, 'Поле должно содержать 3+ символов')
  .max(16, 'Поле не должно содержать больше 16 символов');

export const phoneScheme = string.length(12, 'Номер должен содержать 12 символов');

// other object schemes

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

export const getCustomersScheme = z.object({
  total: number,
  page: number,
  customers: z.array(customerScheme),
});

export const countBonusesFormScheme = z.object({
  phone: phoneScheme,
  sum: number.min(1, 'Число должно быть больше нуля').max(9999999999, 'Число должно быть не больше 9 999 999 999'),
});

export const verifyCodeScheme = z.object({
  phone: phoneScheme,
  code: z.string().length(4, 'Код должен содержать 4 символа'),
});

// config schemes

export const configBonusPercentValueScheme = number
  .min(0, 'Число должно быть не меньше нуля')
  .max(100, 'Число должно быть не больше 100');

export const configBonusPercentScheme = z.object({
  key: z.literal('bonusPercent'),
  value: configBonusPercentValueScheme,
});

export const configExampleScheme = z.object({
  key: z.literal('example'),
  value: z.boolean(),
});

export const configScheme = z.union([
  configBonusPercentScheme.extend({ id: number }),
  configExampleScheme.extend({ id: number }),
]);

export const getConfigScheme = z.array(configScheme).nonempty();

export const createConfigScheme = z.union([configBonusPercentScheme, configExampleScheme]);

export const postConfigScheme = z.array(createConfigScheme).nonempty();
