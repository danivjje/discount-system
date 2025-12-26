import { db } from '../client.js';
import { seed } from 'drizzle-seed';
import { usersTable, appConfigTable } from '../schema.js';
import { hashSync } from 'bcrypt-ts';

async function main() {
  try {
    console.log('Seeding...');
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
    db.$client.end();
    console.log('Successfully');
  }
}

main();
