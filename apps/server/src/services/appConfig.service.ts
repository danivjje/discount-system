import { db } from '@packages/db/client';
import { appConfigTable } from '@packages/db';
import { type AppConfig, type CreateCurrentAppConfig, type CurrentAppConfig, getConfigScheme } from '@packages/shared';

export const fetchAll = async (): Promise<CurrentAppConfig[]> => {
  const data: AppConfig[] = await db.select().from(appConfigTable);
  const appConfig: CurrentAppConfig[] = getConfigScheme.parse(data);
  return appConfig;
};

export const update = async (appConfig: CurrentAppConfig[] | CreateCurrentAppConfig[]): Promise<AppConfig[]> => {
  await db.transaction(async (tx) => {
    for (let i: number = 0; i < appConfig.length; ++i) {
      const configItem: CreateCurrentAppConfig | CurrentAppConfig = appConfig[i];
      await tx
        .insert(appConfigTable)
        .values({ key: configItem.key, value: configItem.value })
        .onDuplicateKeyUpdate({ set: { value: configItem.value } });
    }
  });

  const newConfig: AppConfig[] = await db.select().from(appConfigTable);
  return newConfig;
};
