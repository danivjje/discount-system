import * as configService from '@/services/appConfig.service';
import { postConfigScheme } from '@packages/schemes';
import { AppConfig, CreateAppConfig } from '@packages/types';
import { RequestHandler } from 'express';
import z from 'zod';

export const getAppConfig: RequestHandler = async (_req, res, next) => {
  try {
    const appConfig: AppConfig[] = await configService.fetchAll();
    return res.status(200).json(appConfig);
  } catch (err) {
    next(err);
  }
};

export const updateAppConfig: RequestHandler = async (req, res, next) => {
  try {
    const data: AppConfig[] = req.body;
    const appConfig: CreateAppConfig[] = z.array(postConfigScheme).nonempty().parse(data);

    const newConfig: AppConfig[] = await configService.update(appConfig);

    return res.status(200).json(newConfig);
  } catch (err) {
    next(err);
  }
};
