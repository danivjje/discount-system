import prisma from '@/client';
import { AppConfigValue } from '@/types';
import { AppConfig } from '@prisma/client';
import { RequestHandler } from 'express';

export const getAppConfig: RequestHandler = async (_req, res) => {
  const appConfig: AppConfig[] = await prisma.appConfig.findMany();
  return res.json(appConfig);
};

export const updateAppConfig: RequestHandler = async (req, res) => {
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

  return res.json(appConfig);
};
