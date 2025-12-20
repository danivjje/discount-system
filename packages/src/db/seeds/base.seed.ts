import db from '../index';
import { seed } from 'drizzle-seed';
import { usersTable, appConfigTable } from '../schema';
import { hashSync } from 'bcrypt-ts';

async function main() {
  try {
    await seed(db, { users: usersTable, appConfig: appConfigTable }).refine((f) => ({
      users: {
        columns: {
          username: f.default({ defaultValue: process.env.ADMIN_USERNAME }),
          password: f.default({ defaultValue: hashSync(process.env.ADMIN_PASSWORD, 10) }),
        },
        count: 1,
      },
      appConfig: {
        columns: {
          key: f.default({ defaultValue: 'bonusPercent' }),
          value: f.default({ defaultValue: 2 }),
        },
        count: 1,
      },
    }));
  } catch (err) {
    console.log(err);
  } finally {
  }
}

main();
