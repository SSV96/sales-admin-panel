import { Sequelize } from 'sequelize-typescript';
import { faker } from '@faker-js/faker';
import { Retailer } from './core/retailer/retailer.schema';
import {
  Wholesaler,
  WholesalerRetailer,
} from './core/wholesaler/wholesaler.schema';
import { Stock } from './core/stock/stock.schema';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'password',
  database: process.env.PG_DATABASE || 'wholesaler',
  models: [Retailer, Wholesaler, Stock, WholesalerRetailer],
  dialectOptions: {
    ssl: {
      require: process.env.NODE_ENV === 'production' ? true : false,
      rejectUnauthorized: false,
    },
  },
  logging: console.log,
});

async function seedDatabase() {
  try {
    console.log('🚀 Connecting to the database...');
    await sequelize.authenticate();
    console.log('✅ Connected successfully!');

    const wholesalers = [];
    const wholesalerCount = faker.number.int({ min: 3, max: 5 });

    for (let i = 0; i < wholesalerCount; i++) {
      const wholesaler = await Wholesaler.create({
        id: faker.string.uuid(),
        name: faker.company.name(),
        mobile_number: faker.phone.number(),
        createdAt: new Date(
          2021,
          faker.number.int({ min: 2, max: 10 }),
          faker.number.int({ min: 1, max: 28 }),
        ),
        updatedAt: new Date(
          2021,
          faker.number.int({ min: 2, max: 10 }),
          faker.number.int({ min: 1, max: 28 }),
        ),
      });
      wholesalers.push(wholesaler);
    }

    console.log(`✅ Created ${wholesalers.length} Wholesalers`);

    const retailers = [];
    const retailerCount = faker.number.int({ min: 2, max: 3 });

    for (let i = 0; i < retailerCount; i++) {
      const retailer = await Retailer.create({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        mobile_number: faker.phone.number(),
        createdAt: new Date(
          2021,
          faker.number.int({ min: 2, max: 10 }),
          faker.number.int({ min: 1, max: 28 }),
        ),
        updatedAt: new Date(
          2021,
          faker.number.int({ min: 2, max: 10 }),
          faker.number.int({ min: 1, max: 28 }),
        ),
      });
      retailers.push(retailer);
    }

    console.log(`✅ Created ${retailers.length} Retailers`);

    for (const retailer of retailers) {
      const randomWholesaler =
        wholesalers[faker.number.int({ min: 0, max: wholesalers.length - 1 })];

      for (let month = 0; month < 12; month++) {
        const transactionCount = faker.number.int({ min: 3, max: 6 });

        for (let j = 0; j < transactionCount; j++) {
          const transactionDate = new Date(
            2021,
            month,
            faker.number.int({ min: 1, max: 28 }),
          );

          await Stock.create({
            id: faker.string.uuid(),
            wholesaler_id: randomWholesaler.id,
            retailer_id: retailer.id,
            stock_amount: faker.number.int({ min: 10, max: 1000 }),
            createdAt: transactionDate,
            updatedAt: transactionDate,
          });

          const relationExists = await randomWholesaler.$has(
            'retailers',
            retailer,
          );

          if (!relationExists) {
            await randomWholesaler.$add('retailers', retailer);
          }
        }
      }
    }

    console.log(`✅ Stock Transactions Generated Successfully!`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await sequelize.close();
    console.log('🔌 Connection closed');
  }
}

seedDatabase();
