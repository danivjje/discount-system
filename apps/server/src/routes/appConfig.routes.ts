import express from 'express';
import { getAppConfig } from '@/controllers/appConfig.controller';
import { updateAppConfig } from '@/controllers/appConfig.controller';

const appConfigRouter = express.Router();

appConfigRouter.get('/', getAppConfig);
appConfigRouter.post('/', updateAppConfig);

export default appConfigRouter;
