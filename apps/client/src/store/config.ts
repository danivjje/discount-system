import { getConfig, postConfig } from '@/api';
import type { CreateCurrentAppConfig, CurrentAppConfig } from '@packages/shared';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';
import { useToastsStore } from './toasts';
import { handleHttpError } from '@/helpers/handle-http-error';

export const useConfigStore = defineStore('config', () => {
  const config: Ref<(CurrentAppConfig | CreateCurrentAppConfig)[]> = ref([]);
  const toastsStore = useToastsStore();

  const fetchConfig = async (): Promise<void> => {
    try {
      config.value = await getConfig();
    } catch (err) {
      await handleHttpError(err, toastsStore);
      throw err;
    }
  };

  const updateConfig = async (): Promise<CurrentAppConfig[]> => {
    try {
      return await postConfig(config.value);
    } catch (err) {
      await handleHttpError(err, toastsStore);
      throw err;
    }
  };

  return {
    config,
    fetchConfig,
    updateConfig,
  };
});
