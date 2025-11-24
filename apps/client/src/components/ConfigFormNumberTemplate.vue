<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { useConfigStore } from '@/store';
import type { AppConfig } from '@packages/types';
import z, { ZodError, type ZodSchema } from 'zod';
import type { $ZodFlattenedError } from 'zod/v4/core';

import { InputNumber, Button, IftaLabel } from 'primevue';
import InputErrors from '@/components/InputErrors.vue';
import { useToastsStore } from '@/store';

const { configKey, title, zodScheme } = defineProps<{
  configKey: string;
  title: string;
  zodScheme: ZodSchema;
}>();

const toastsStore = useToastsStore();
const configStore = useConfigStore();

const inputErrors: Ref<$ZodFlattenedError<unknown> | null> = ref(null);
const inputValue: Ref<number> = ref(0);

const submitConfigKeyUpdate = async (): Promise<void> => {
  try {
    inputErrors.value = null;
    const value = zodScheme.parse(inputValue.value);

    const thisConfigKeyIndex: number = configStore.config.findIndex((elem) => elem.key === configKey);
    if (thisConfigKeyIndex > -1) {
      (configStore.config[thisConfigKeyIndex] as AppConfig).value = value;
    } else {
      configStore.config.push({ key: configKey, value: value } as AppConfig);
    }

    const newConfig: AppConfig[] | void = await configStore.updateConfig();
    if (newConfig) {
      configStore.config = newConfig;
    }
    toastsStore.showSuccessToast('Успешно обновлено');
  } catch (err) {
    if (err instanceof ZodError) {
      inputErrors.value = z.flattenError(err);
    }
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
  <form @submit.prevent="submitConfigKeyUpdate" class="flex flex-col items-stretch">
    <div class="mb-3">
      <IftaLabel>
        <InputNumber
          data-test="config-number"
          v-model="inputValue"
          :invalid="!!inputErrors?.formErrors?.length"
          class="w-full"
        />
        <label :for="configKey">{{ title }}</label>
      </IftaLabel>
      <InputErrors :errors="inputErrors?.formErrors" />
    </div>
    <Button data-test="config-submit" type="submit">Изменить</Button>
  </form>
</template>
