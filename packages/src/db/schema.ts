import { relations } from 'drizzle-orm';
import { boolean, char, decimal, int, json, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

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

export const refreshTokensTable = mysqlTable('refresh_tokens', {
  id: int().primaryKey().autoincrement(),
  token: varchar('token', { length: 512 }).unique().notNull(),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
  revoked: boolean().default(false).notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  tokens: many(refreshTokensTable),
}));

export const refreshTokensRelations = relations(refreshTokensTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [refreshTokensTable.userId],
    references: [usersTable.id],
  }),
}));
