import { NotFoundError } from '@/errors';
import db from '@packages/db';
import { appConfigTable, customersTable } from '@packages/db/schema';
import { AppConfig, AppConfigValue, CountBonusesForm, Customer } from '@packages/types';
import { eq } from 'drizzle-orm';

export const fetchAll = async (): Promise<Customer[]> => {
  return await db.select().from(customersTable);
};

export const fetchByPhone = async (phone: string): Promise<Customer | null> => {
  const result = await db.select().from(customersTable).where(eq(customersTable.phone, phone)).limit(1);
  const customer: Customer | null = result[0] || null;
  return customer;
};

export const upsert = async (data: CountBonusesForm): Promise<Customer> => {
  const { phone, sum } = data;

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
  return customer[0];
};

export const resetBonuses = async (phone: string): Promise<void> => {
  await db.update(customersTable).set({ bonuses: 0 }).where(eq(customersTable.phone, phone)).limit(1);
};
