<script setup lang="ts">
import { onMounted } from 'vue';
import { useConfigStore, useToastsStore } from '@/store';
import { configBonusPercentValueScheme } from '@packages/schemes';
import { handleHttpError } from '@/helpers/handle-http-error';

import ConfigFormNumberTemplate from '@/components/ConfigFormNumberTemplate.vue';

const toastsStore = useToastsStore();
const configStore = useConfigStore();

const fetchConfig = async (): Promise<void> => {
  if (configStore.config.length === 0) {
    try {
      configStore.fetchConfig();
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  }
};
onMounted(() => {
  fetchConfig();
});
</script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/" class="mb-10 text-gray-800 text-base">Вернуться назад</RouterLink>
    <ConfigFormNumberTemplate
      config-key="bonusPercent"
      title="Процент бонуса"
      :zod-scheme="configBonusPercentValueScheme"
    />
  </div>
</template>
