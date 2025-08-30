import express from 'express';
import prisma from '@/client';
import type { Customer, AppConfig } from '@prisma/client';

const app = express();
const port: number = 3000;
const router = express.Router();

router.get('/customers', async (_req, res) => {
  const customers: Customer[] = await prisma.customer.findMany();
  return res.json(customers);
});

router.get('/customers/:phone', async (req, res) => {
  const customer: Customer | null = await prisma.customer.findUnique({
    where: { phone: req.params.phone },
  });

  return res.json(customer ? customer : {});
});

router.post('/customers', async (req, res) => {
  const { phone, sum }: { phone: string; sum: number } = req.body;
  const foundCustomer: Customer | null = await prisma.customer.findUnique({
    where: { phone },
  });

  if (!foundCustomer) {
    const customer: Customer = await prisma.customer.create({
      data: { phone, totalSum: sum },
    });
    return res.json(customer);
  }

  const updatedUser: Customer = await prisma.customer.update({
    where: { id: foundCustomer.id },
    data: { totalSum: foundCustomer.totalSum.toNumber() + sum },
  });
  return res.json(updatedUser);
});

router.get('/config', async (_req, res) => {
  const appConfig: AppConfig[] = await prisma.appConfig.findMany();
  return res.json(appConfig);
});

router.post('/config', async (req, res) => {
  const appConfig: AppConfig[] = req.body;
  await prisma.appConfig.deleteMany({});
  await prisma.appConfig.createMany({
    data: appConfig,
  });
  return res.json(appConfig);
});

app.use('/api', router);
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
