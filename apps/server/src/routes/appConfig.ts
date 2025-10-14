import express from 'express';
import { getAppConfig } from '@/controllers/appConfigController';
import { updateAppConfig } from '@/controllers/appConfigController';

const appConfigRouter = express.Router();

appConfigRouter.get('/', getAppConfig);
appConfigRouter.post('/', updateAppConfig);

export default appConfigRouter;
