import { db } from '@packages/db/client';
import { appConfigTable } from '@packages/db';
import { CreateCurrentAppConfig, getConfigScheme, type AppConfig, type CurrentAppConfig } from '@packages/shared';

export const fetchAll = async (): Promise<CurrentAppConfig[]> => {
  const data: AppConfig[] = await db.select().from(appConfigTable);
  const appConfig: CurrentAppConfig[] = getConfigScheme.parse(data);
  return appConfig;
};

export const update = async (appConfig: CreateCurrentAppConfig[]): Promise<CurrentAppConfig[]> => {
  await db.transaction(async (tx) => {
    for (let i: number = 0; i < appConfig.length; ++i) {
      const configItem: CreateCurrentAppConfig = appConfig[i];
      await tx
        .insert(appConfigTable)
        .values({ key: configItem.key, value: configItem.value })
        .onDuplicateKeyUpdate({ set: { value: configItem.value } });
    }
  });

  const newConfig: AppConfig[] = await db.select().from(appConfigTable);
  return getConfigScheme.parse(newConfig);
};
