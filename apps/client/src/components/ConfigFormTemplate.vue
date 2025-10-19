<script setup lang="ts">
import { useConfigStore } from '@/store';
import { onMounted, ref, type Ref } from 'vue';

import { InputText, Button } from 'primevue';

const { configKey, title, inputType, inputPlaceholder, defaultValue } = defineProps<{
  configKey: string;
  title: string;
  inputType: string;
  inputPlaceholder?: string;
  defaultValue?: number | boolean | string | null;
}>();

const configStore = useConfigStore();

const inputValue: Ref<string> = ref(defaultValue ? String(defaultValue) : '');

const submitConfigKeyUpdate = async (): Promise<void> => {
  const thisConfigKeyIndex: number = configStore.config.findIndex((elem) => elem.key === configKey);
  if (thisConfigKeyIndex > -1) {
    configStore.config[thisConfigKeyIndex].value = inputValue.value;
  } else {
    configStore.config.push({ key: configKey, value: inputValue.value });
  }

  await configStore.updateConfig();
};

onMounted(() => {
  if (configStore.config.length === 0) {
    configStore.fetchConfig();
  }
});
</script>

<template>
  <form @submit.prevent="submitConfigKeyUpdate" class="flex flex-col items-center justify-center">
    <strong class="mb-2 font-normal">{{ title }}</strong>
    <InputText v-model="inputValue" :type="inputType" :placeholder="inputPlaceholder || ''" class="mb-2" />
    <Button>Изменить</Button>
  </form>
</template>
