import {
  getCustomers,
  resetCustomerBonuses,
  getCustomerByPhone,
  upsertCustomer,
} from '@/controllers/customer.controller.js';
import express from 'express';

const customerRouter = express.Router();

customerRouter.get('/', getCustomers);
customerRouter.get('/:phone', getCustomerByPhone);
customerRouter.post('/', upsertCustomer);
customerRouter.patch('/:phone/reset-bonuses', resetCustomerBonuses);

export default customerRouter;
