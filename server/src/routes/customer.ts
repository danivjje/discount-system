import { getCustomers, resetCustomerBonuses } from '@/controllers/customerController';
import { getCustomer } from '@/controllers/customerController';
import { upsertCustomer } from '@/controllers/customerController';
import express from 'express';

const customerRouter = express.Router();

customerRouter.get('/', getCustomers);
customerRouter.get('/:phone', getCustomer);
customerRouter.post('/', upsertCustomer);
customerRouter.patch('/:phone/reset-bonuses', resetCustomerBonuses);

export default customerRouter;
