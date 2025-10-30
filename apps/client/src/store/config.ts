import { getConfig, postConfig } from '@/api';
import type { AppConfig } from '@packages/types';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';
import { useToastsStore } from './toasts';
import { handleHttpError } from '@/helpers/handle-http-error';

export const useConfigStore = defineStore('config', () => {
  const config: Ref<AppConfig[]> = ref([]);
  const toastsStore = useToastsStore();

  const fetchConfig = async (): Promise<void> => {
    try {
      config.value = await getConfig();
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  };

  const updateConfig = async (): Promise<AppConfig[] | void> => {
    try {
      return await postConfig(config.value);
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  };

  return {
    config,
    fetchConfig,
    updateConfig,
  };
});
