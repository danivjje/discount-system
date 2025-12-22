import { NotFoundError } from '@/errors';
import type { SortField, SortOrder, GetCustomersResponse, BonusPercentConfig } from '@packages/types';
import db from '@packages/db';
import { appConfigTable, customersTable } from '@packages/db/schema';
import { AppConfig, CountBonusesForm, Customer } from '@packages/types';
import { asc, count, desc, eq, like } from 'drizzle-orm';

export const fetchAll = async (
  page: number,
  searchPhone: string | undefined,
  sortField: SortField | undefined,
  sortOrder: SortOrder | undefined,
): Promise<GetCustomersResponse> => {
  const limit: number = 10;
  const offset: number = (page - 1) * limit;
  const filter = searchPhone ? like(customersTable.phone, `%${searchPhone}%`) : undefined;

  const generateOrder = () => {
    if (sortField && sortOrder) {
      if (sortOrder === 'asc') return asc(customersTable[sortField]);
      if (sortOrder === 'desc') return desc(customersTable[sortField]);
    }

    return asc(customersTable.id);
  };

  const customers = await db
    .select()
    .from(customersTable)
    .where(filter)
    .orderBy(generateOrder())
    .limit(limit)
    .offset(offset);
  const total = await db.select({ count: count() }).from(customersTable).where(filter);

  return {
    customers: customers,
    total: total[0].count,
    page,
  };
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
  const percentConfig: BonusPercentConfig | null = (configResult[0] as BonusPercentConfig) ?? null;
  if (!percentConfig) {
    throw new NotFoundError('Не установлен процент бонуса в настройках.');
  }

  const bonusPercent: number = percentConfig.value;
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
