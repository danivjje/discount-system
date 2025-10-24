import { char, decimal, int, json, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  username: varchar('username', { length: 16 }).notNull(),
  password: text().notNull(),
});

export const customersTable = mysqlTable('customers', {
  id: int().primaryKey().autoincrement(),
  phone: char('phone', { length: 12 }).notNull().unique(),
  totalSum: decimal('total_sum', { precision: 10, scale: 2, mode: 'number' }).default(0).notNull(),
  bonuses: decimal('bonuses', { precision: 10, scale: 2, mode: 'number' }).default(0).notNull(),
});

export const appConfigTable = mysqlTable('app_config', {
  id: int().primaryKey().autoincrement(),
  key: varchar('key', { length: 30 }).notNull().unique(),
  value: json(),
});
