import prisma from '@packages/database/client';
import { AppConfigValue } from '@packages/types';
import { AppConfig } from '@prisma/client';
import { RequestHandler } from 'express';

export const getAppConfig: RequestHandler = async (_req, res, next) => {
  try {
    const appConfig: AppConfig[] = await prisma.appConfig.findMany();
    return res.status(200).json(appConfig);
  } catch (err) {
    next(err);
  }
};

export const updateAppConfig: RequestHandler = async (req, res, next) => {
  try {
    const appConfig: AppConfig[] = req.body;

    await prisma.$transaction(
      appConfig.map((item) => {
        return prisma.appConfig.upsert({
          where: {
            key: item.key,
          },
          update: { value: item.value as AppConfigValue },
          create: { key: item.key, value: item.value as AppConfigValue },
        });
      }),
    );

    return res.status(200).json(appConfig);
  } catch (err) {
    next(err);
  }
};
