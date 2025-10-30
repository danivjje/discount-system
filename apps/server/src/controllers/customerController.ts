import { NotFoundError } from '@/errors';
import db from '@packages/db';
import { appConfigTable, customersTable } from '@packages/db/schema';
import { countBonusesFormScheme, phoneScheme } from '@packages/schemes';
import { AppConfigValue, AppConfig, Customer } from '@packages/types';
import { eq } from 'drizzle-orm';
import { RequestHandler } from 'express';

export const getCustomers: RequestHandler = async (_req, res, next) => {
  try {
    const customers: Customer[] = await db.select().from(customersTable);
    return res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

export const getCustomer: RequestHandler = async (req, res, next) => {
  try {
    const phone: string = phoneScheme.parse(req.params.phone);
    const result: Customer[] = await db.select().from(customersTable).where(eq(customersTable.phone, phone)).limit(1);
    const customer: Customer | null = result[0] || null;

    if (customer) return res.status(200).json(customer);
    throw new NotFoundError('Пользователь не найден.');
  } catch (err) {
    next(err);
  }
};

export const upsertCustomer: RequestHandler = async (req, res, next) => {
  try {
    const { phone, sum: bodySum } = countBonusesFormScheme.parse(req.body);
    const sum: number = Number(bodySum);

    const configResult: AppConfig[] = await db
      .select()
      .from(appConfigTable)
      .where(eq(appConfigTable.key, 'bonusPercent'))
      .limit(1);
    const percentConfig: AppConfig | null = configResult[0] || null;
    if (!percentConfig) {
      throw new NotFoundError('Не установлен процент бонуса в настройках.');
    }

    const bonusPercent: number = percentConfig.value as AppConfigValue as number;
    const bonuses: number = sum / (100 / bonusPercent);

    const customerResult: Customer[] = await db.select().from(customersTable).where(eq(customersTable.phone, phone));
    const foundCustomer: Customer | null = customerResult[0] || null;

    await db
      .insert(customersTable)
      .values({ phone, bonuses, totalSum: sum })
      .onDuplicateKeyUpdate({
        set: {
          bonuses: foundCustomer ? foundCustomer.bonuses + bonuses : 0,
          totalSum: foundCustomer ? foundCustomer.totalSum + sum : 0,
        },
      });

    const customer: Customer[] = await db.select().from(customersTable).where(eq(customersTable.phone, phone)).limit(1);

    return res.status(200).json(customer[0]);
  } catch (err) {
    next(err);
  }
};

export const resetCustomerBonuses: RequestHandler = async (req, res, next) => {
  try {
    const phone: string = phoneScheme.parse(req.params.phone);

    await db.update(customersTable).set({ bonuses: 0 }).where(eq(customersTable.phone, phone)).limit(1);

    return res.status(200).json({ phone });
  } catch (err) {
    next(err);
  }
};
