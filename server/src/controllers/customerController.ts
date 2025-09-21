import prisma from '@/client';
import { Customer } from '@prisma/client';
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
};
