import { db } from '../client.js';
import { seed } from 'drizzle-seed';
import { customersTable } from '../schema.js';

async function main() {
  try {
    console.log('Seeding...');
    await seed(db, { customers: customersTable }).refine((f) => ({
      customers: {
        columns: {
          id: f.intPrimaryKey(),
          phone: f.phoneNumber({ template: '380#########' }),
          bonuses: f.number({ minValue: 0, maxValue: 1000, precision: 100 }),
          totalSum: f.number({ minValue: 0, maxValue: 10000, precision: 100 }),
        },
        count: 500,
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
