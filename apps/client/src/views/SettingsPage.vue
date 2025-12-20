<script setup lang="ts">
import { onMounted } from 'vue';
import { useConfigStore } from '@/store';
import { configBonusPercentValueScheme } from '@packages/schemes';

import NavigationPageTemplate from '@/components/ui/NavigationPageTemplate.vue';
import ConfigFormNumber from '@/components/ConfigFormNumber.vue';

const configStore = useConfigStore();

onMounted(() => {
  if (!configStore.config.length) {
    try {
      configStore.fetchConfig();
    } catch (err) {}
  }
});
</script>

<template>
  <NavigationPageTemplate>
    <ConfigFormNumber config-key="bonusPercent" title="Процент бонуса" :zod-scheme="configBonusPercentValueScheme" />
  </NavigationPageTemplate>
</template>
