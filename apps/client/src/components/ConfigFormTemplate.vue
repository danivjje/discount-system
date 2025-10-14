<script setup lang="ts">
import { useConfigStore } from '@/store';
import { onMounted, ref, type Ref } from 'vue';

const { configKey, title, inputType, inputPlaceholder } = defineProps<{
  configKey: string;
  title: string;
  inputType: string;
  inputPlaceholder?: string;
  defaultValue?: number | boolean | string | null;
}>();

const configStore = useConfigStore();

const inputValue: Ref<string | number | boolean> = ref('');

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
  <form @submit.prevent="submitConfigKeyUpdate" class="border-2 border-solid border-gray-300 p-3">
    <strong class="mr-2 font-normal">{{ title }}</strong>
    <input
      :type="inputType"
      :placeholder="inputPlaceholder || ''"
      :value="defaultValue || null"
      class="mr-2 w-fit border border-solid border-gray-400 px-5 py-2"
    />
    <button class="px-5 py-2">Изменить</button>
  </form>
</template>
