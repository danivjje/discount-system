import prisma from '@/client';
import { AppConfig, Customer } from '@prisma/client';
import { RequestHandler } from 'express';

export const getCustomers: RequestHandler = async (_req, res) => {
  const customers: Customer[] = await prisma.customer.findMany();
  return res.json(customers);
};

export const getCustomer: RequestHandler = async (req, res) => {
  const customer: Customer | null = await prisma.customer.findUnique({
    where: { phone: req.params.phone },
  });

  return res.json(customer ? customer : {});
};

export const upsertCustomer: RequestHandler = async (req, res) => {
  const phone: string = req.params.phone;
  console.log('SEX: req.body: ', req.body);
  const sum: number = typeof req.body.sum === 'number' ? req.body.sum : Number(req.body.sum);
  const foundCustomer: Customer | null = await prisma.customer.findUnique({
    where: { phone },
  });

  const percentConfig: AppConfig | null = await prisma.appConfig.findUnique({ where: { key: 'bonusPercent' } });
  if (!percentConfig) throw new Error('set bonus percent');
  const bonusPercent: number = +percentConfig.value;
  const bonuses: number = sum / (100 / bonusPercent);

  if (!foundCustomer) {
    const customer: Customer = await prisma.customer.create({
      data: { phone, totalSum: sum, bonuses: bonuses },
    });
    return res.json(customer);
  }

  const updatedCustomer: Customer = await prisma.customer.update({
    where: { id: foundCustomer.id },
    data: {
      totalSum: foundCustomer.totalSum.toNumber() + sum,
      bonuses: foundCustomer.bonuses.toNumber() + bonuses,
    },
  });
  return res.json(updatedCustomer);
};

export const resetCustomerBonuses: RequestHandler = async (req, res) => {
  const phone: string = req.params.phone;

  const updatedCustomer: Customer = await prisma.customer.update({
    where: { phone },
    data: { bonuses: 0 },
  });

  return res.json(updatedCustomer);
};
