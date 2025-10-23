import db from '@packages/db';
import { appConfigTable } from '@packages/db/schema';
import { postConfigScheme } from '@packages/schemes';
import { AppConfig, CreateAppConfig } from '@packages/types';
import { RequestHandler } from 'express';
import z from 'zod';

export const getAppConfig: RequestHandler = async (_req, res, next) => {
  try {
    const appConfig: AppConfig[] = await db.select().from(appConfigTable);
    return res.status(200).json(appConfig);
  } catch (err) {
    next(err);
  }
};

export const updateAppConfig: RequestHandler = async (req, res, next) => {
  try {
    const data: AppConfig[] = req.body;
    const appConfig: CreateAppConfig[] = z.array(postConfigScheme).parse(data);

    await db.transaction(async (tx) => {
      for (let i: number = 0; i < appConfig.length; ++i) {
        const configItem: CreateAppConfig = appConfig[i];
        await tx
          .insert(appConfigTable)
          .values({ key: configItem.key, value: configItem.value })
          .onDuplicateKeyUpdate({ set: { value: configItem.value } });
      }
    });

    return res.status(200).json(appConfig);
  } catch (err) {
    next(err);
  }
};
