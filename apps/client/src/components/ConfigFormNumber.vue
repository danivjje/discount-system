<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { useConfigStore, useToastsStore } from '@/store';
import { createConfigScheme, type CreateCurrentAppConfig, type CurrentAppConfig } from '@packages/shared';
import z, { ZodError } from 'zod';
import type { $ZodFlattenedError } from 'zod/v4/core';

import { InputNumber, Button, IftaLabel } from 'primevue';
import InputErrors from '@/components/ui/InputErrors.vue';

const { configKey, title, zodScheme } = defineProps({
  configKey: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  zodScheme: {
    type: z.ZodObject,
    required: true,
    validator<T extends z.ZodObject>(value: T) {
      const incomingKey: string | undefined = value.def.shape?.key?.def?.values[0];
      const incomingValueType: string | undefined = value.def.shape?.value?.type;
      const incomingKeysLength = Object.keys(value.def.shape).length;

      return createConfigScheme.options.some((item) => {
        const targetKey = item.def.shape.key.def.values[0];
        const targetValueType = item.def.shape.value.type;
        const targetSchemeKeysLength = Object.keys(item.def.shape).length;

        return (
          targetKey === incomingKey &&
          incomingValueType === targetValueType &&
          incomingKeysLength === targetSchemeKeysLength
        );
      });
    },
  },
});

const toastsStore = useToastsStore();
const configStore = useConfigStore();

const inputErrors: Ref<$ZodFlattenedError<unknown> | null> = ref(null);
const inputValue: Ref<number> = ref(0);

const submitConfigKeyUpdate = async (): Promise<void> => {
  try {
    inputErrors.value = null;
    const newConfigItem: CreateCurrentAppConfig = zodScheme.parse({
      key: configKey,
      value: inputValue.value,
    }) as CreateCurrentAppConfig;

    const thisConfigKeyIndex: number = configStore.config.findIndex((elem) => elem.key === configKey);
    if (thisConfigKeyIndex > -1) {
      configStore.config[thisConfigKeyIndex] = newConfigItem;
    } else {
      configStore.config.push(newConfigItem);
    }

    const newConfig: CurrentAppConfig[] = await configStore.updateConfig();
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
  <form @submit.prevent="submitConfigKeyUpdate" class="flex w-full flex-col items-stretch sm:w-fit">
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
