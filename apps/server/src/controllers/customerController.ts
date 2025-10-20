import { NotFoundError } from '@/errors/NotFoundError';
import prisma from '@packages/database/client';
import { AppConfigValue } from '@packages/types';
import { AppConfig, Customer } from '@prisma/client';
import { RequestHandler } from 'express';

export const getCustomers: RequestHandler = async (_req, res, next) => {
  try {
    const customers: Customer[] = await prisma.customer.findMany();
    return res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

export const getCustomer: RequestHandler = async (req, res, next) => {
  try {
    const customer: Customer | null = await prisma.customer.findUnique({
      where: { phone: req.params.phone },
    });

    if (customer) return res.status(200).json(customer);
    throw new NotFoundError('Пользователь не найден.');
  } catch (err) {
    next(err);
  }
};

export const upsertCustomer: RequestHandler = async (req, res, next) => {
  try {
    const { phone, sum: bodySum }: { phone: string; sum: number } = req.body;
    const sum: number = Number(bodySum);

    const percentConfig: AppConfig | null = await prisma.appConfig.findUnique({ where: { key: 'bonusPercent' } });
    if (!percentConfig) {
      throw new NotFoundError('Не установлен процент бонуса в настройках.');
    }

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

    return res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

export const resetCustomerBonuses: RequestHandler = async (req, res, next) => {
  try {
    const phone: string = req.params.phone;

    const updatedCustomer: Customer = await prisma.customer.update({
      where: { phone },
      data: { bonuses: 0 },
    });

    return res.status(200).json(updatedCustomer);
  } catch (err) {
    next(err);
  }
};
