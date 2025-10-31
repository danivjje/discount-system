import db from '@packages/db';
import { appConfigTable } from '@packages/db/schema';
import { AppConfig, CreateAppConfig } from '@packages/types';

export const fetchAll = async (): Promise<AppConfig[]> => {
  const appConfig: AppConfig[] = await db.select().from(appConfigTable);
  return appConfig;
};

export const update = async (appConfig: AppConfig[] | CreateAppConfig[]): Promise<AppConfig[]> => {
  await db.transaction(async (tx) => {
    for (let i: number = 0; i < appConfig.length; ++i) {
      const configItem: CreateAppConfig | AppConfig = appConfig[i];
      await tx
        .insert(appConfigTable)
        .values({ key: configItem.key, value: configItem.value })
        .onDuplicateKeyUpdate({ set: { value: configItem.value } });
    }
  });

  const newConfig: AppConfig[] = await db.select().from(appConfigTable);
  return newConfig;
};
