import 'dotenv/config';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import { Pool } from 'mysql2';

export const db: MySql2Database<Record<string, never>> & { $client: Pool } = drizzle(process.env.DATABASE_URL);
