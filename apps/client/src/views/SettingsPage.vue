<script setup lang="ts">
import { useConfigStore } from '@/store';
import { onMounted } from 'vue';

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
    <RouterLink to="/" class="mb-10">Вернуться назад</RouterLink>
    <ConfigFormNumberTemplate config-key="bonusPercent" title="Процент бонуса" />
  </div>
</template>
