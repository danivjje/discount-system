<script setup lang="ts">
import { onMounted } from 'vue';
import { useConfigStore } from '@/store';
import { configBonusPercentValueScheme } from '@packages/schemes';

import NavigationPageTemplate from '@/components/NavigationPageTemplate.vue';
import ConfigFormNumberTemplate from '@/components/ConfigFormNumberTemplate.vue';

const configStore = useConfigStore();

onMounted(() => {
  if (configStore.config.length === 0) {
    configStore.fetchConfig();
  }
});
</script>

<template>
  <NavigationPageTemplate>
    <ConfigFormNumberTemplate
      config-key="bonusPercent"
      title="Процент бонуса"
      :zod-scheme="configBonusPercentValueScheme"
    />
  </NavigationPageTemplate>
</template>
