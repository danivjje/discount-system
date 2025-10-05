import prisma from '@/client';
import { AppConfigValue } from '@/types';
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
  const { phone, sum: bodySum }: { phone: string; sum: number } = req.body;
  const sum = Number(bodySum);

  const percentConfig: AppConfig | null = await prisma.appConfig.findUnique({ where: { key: 'bonusPercent' } });
  if (!percentConfig) return res.status(400).json({ message: 'error' });

  const bonusPercent: number = percentConfig.value as AppConfigValue as number;
  const bonuses: number = sum / (100 / bonusPercent);

  const foundCustomer: Customer | null = await prisma.customer.findUnique({ where: { phone } });

  const customer = await prisma.customer.upsert({
    where: { phone },
    update: {
      totalSum: foundCustomer ? foundCustomer.totalSum.toNumber() + sum : 0,
      bonuses: foundCustomer ? foundCustomer.bonuses.toNumber() + bonuses : 0,
    },
    create: {
      phone,
      totalSum: sum,
      bonuses: bonuses,
    },
  });

  return res.json(customer);
};

export const resetCustomerBonuses: RequestHandler = async (req, res) => {
  const phone: string = req.params.phone;

  const updatedCustomer: Customer = await prisma.customer.update({
    where: { phone },
    data: { bonuses: 0 },
  });

  return res.json(updatedCustomer);
};
