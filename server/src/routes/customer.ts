import { getCustomers } from '@/controllers/customerController';
import { getCustomer } from '@/controllers/customerController';
import { upsertCustomer } from '@/controllers/customerController';
import express from 'express';

const customerRouter = express.Router();

customerRouter.get('/', getCustomers);
customerRouter.get('/:phone', getCustomer);
customerRouter.post('/', upsertCustomer);

export default customerRouter;
