import express from 'express';
import { getAppConfig, updateAppConfig } from '@/controllers/appConfig.controller.js';

const appConfigRouter = express.Router();

appConfigRouter.get('/', getAppConfig);
appConfigRouter.post('/', updateAppConfig);

export default appConfigRouter;
