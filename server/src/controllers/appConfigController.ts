import prisma from '@/client';
import { AppConfig } from '@prisma/client';
import { RequestHandler } from 'express';

export const getAppConfig: RequestHandler = async (_req, res) => {
  const appConfig: AppConfig[] = await prisma.appConfig.findMany();
  return res.json(appConfig);
};

export const updateAppConfig: RequestHandler = async (req, res) => {
  const appConfig: AppConfig[] = req.body;
  console.log(req.body);
  await prisma.appConfig.deleteMany({});
  await prisma.appConfig.createMany({
    data: appConfig,
  });
  return res.json(appConfig);
};
