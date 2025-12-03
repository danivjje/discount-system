import * as customerService from '@/services/customer.service';
import { NotFoundError } from '@/errors';
import { countBonusesFormScheme, phoneScheme } from '@packages/schemes';
import { Customer } from '@packages/types';
import { RequestHandler } from 'express';
import { GetCustomersQuery, GetCustomersResponse, NormalizedGetCustomersQuery } from '@/types';

export const getCustomers: RequestHandler = async (req, res, next) => {
  function normalizeQuery(query: GetCustomersQuery): NormalizedGetCustomersQuery {
    return {
      page: query.page ? Number(query.page) : 1,
      phone: query.phone,
      sort: query.sort,
      order: query.order,
    };
  }

  try {
    const { page, phone, sort, order }: NormalizedGetCustomersQuery = normalizeQuery(req.query);

    const response: GetCustomersResponse = await customerService.fetchAll(page, phone, sort, order);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getCustomerByPhone: RequestHandler = async (req, res, next) => {
  try {
    const phone: string = phoneScheme.parse(req.params.phone);
    const customer: Customer | null = await customerService.fetchByPhone(phone);

    if (customer) {
      return res.status(200).json(customer);
    }

    throw new NotFoundError('Пользователь не найден.');
  } catch (err) {
    next(err);
  }
};

export const upsertCustomer: RequestHandler = async (req, res, next) => {
  try {
    const { phone, sum: bodySum } = countBonusesFormScheme.parse(req.body);
    const sum: number = Number(bodySum);

    const upsertedCustomer = await customerService.upsert({ phone, sum });

    return res.status(200).json(upsertedCustomer);
  } catch (err) {
    next(err);
  }
};

export const resetCustomerBonuses: RequestHandler = async (req, res, next) => {
  try {
    const phone: string = phoneScheme.parse(req.params.phone);

    await customerService.resetBonuses(phone);

    return res.status(200).json({ phone });
  } catch (err) {
    next(err);
  }
};
