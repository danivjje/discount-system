<script setup lang="ts">
import { onMounted } from 'vue';
import { useConfigStore } from '@/store';
import { configBonusPercentValueScheme } from '@packages/schemes';

import ConfigFormNumberTemplate from '@/components/ConfigFormNumberTemplate.vue';

const configStore = useConfigStore();

onMounted(() => {
  if (configStore.config.length === 0) {
    configStore.fetchConfig();
  }
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
