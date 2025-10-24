<script setup lang="ts">
import { useConfigStore } from '@/store';
import type { AppConfig } from '@packages/types';

import { InputNumber, Button } from 'primevue';
import { ref, watch, type Ref } from 'vue';

const { configKey, title } = defineProps<{
  configKey: string;
  title: string;
}>();

const configStore = useConfigStore();

const inputValue: Ref<number> = ref(0);

const submitConfigKeyUpdate = async (): Promise<void> => {
  try {
    const thisConfigKeyIndex: number = configStore.config.findIndex((elem) => elem.key === configKey);
    if (thisConfigKeyIndex > -1) {
      (configStore.config[thisConfigKeyIndex] as AppConfig).value = inputValue.value;
    } else {
      configStore.config.push({ key: configKey, value: inputValue.value } as AppConfig);
    }

    const newConfig: AppConfig[] | void = await configStore.updateConfig();
    if (newConfig) {
      configStore.config = newConfig;
    }
  } catch (err) {
    console.log(err);
  }
};

watch(
  () => configStore.config,
  (nv) => {
    inputValue.value = (nv.find((item) => item.key === configKey)?.value as number) || 0;
  },
  { immediate: true },
);
</script>

<template>
  <form @submit.prevent="submitConfigKeyUpdate" class="flex flex-col items-center justify-center">
    <strong class="mb-2 font-normal">{{ title }}</strong>
    <InputNumber v-model="inputValue" class="mb-2" />
    <Button>Изменить</Button>
  </form>
</template>
