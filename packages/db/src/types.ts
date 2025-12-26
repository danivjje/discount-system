import { usersTable, customersTable, appConfigTable, refreshTokensTable, verificationCodesTable } from './schema.js';

export type User = typeof usersTable.$inferSelect;

export type Customer = typeof customersTable.$inferSelect;

export type AppConfig = typeof appConfigTable.$inferSelect;

export type RefreshToken = typeof refreshTokensTable.$inferSelect;

export type VerificationCode = typeof verificationCodesTable.$inferInsert;
