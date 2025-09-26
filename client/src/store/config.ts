import { getConfig, postConfig } from '@/api';
import type { AppConfig } from '@/types';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

export const useConfigStore = defineStore('config', () => {
  const config: Ref<AppConfig[]> = ref([]);

  const fetchConfig = async (): Promise<void> => {
    try {
      config.value = await getConfig();
    } catch (err) {
      console.log(err);
    }
  };

  const updateConfig = async (): Promise<void> => {
    try {
      await postConfig(config.value);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    config,
    fetchConfig,
    updateConfig,
  };
});
