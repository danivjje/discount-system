import { getCustomers, resetCustomerBonuses } from '@/controllers/customer.controller';
import { getCustomerByPhone } from '@/controllers/customer.controller';
import { upsertCustomer } from '@/controllers/customer.controller';
import express from 'express';

const customerRouter = express.Router();

customerRouter.get('/', getCustomers);
customerRouter.get('/:phone', getCustomerByPhone);
customerRouter.post('/', upsertCustomer);
customerRouter.patch('/:phone/reset-bonuses', resetCustomerBonuses);

export default customerRouter;
