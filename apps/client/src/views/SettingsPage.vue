<script setup lang="ts">
import { useConfigStore } from '@/store';
import ConfigFormTemplate from '@/components/ConfigFormTemplate.vue';

const configStore = useConfigStore();
</script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/" class="mb-10">Вернуться назад</RouterLink>
    <ConfigFormTemplate
      config-key="bonusPercent"
      input-type="number"
      title="Процент бонуса"
      :default-value="Number(configStore.config.find((item) => item.key === 'bonusPercent')?.value) || null"
    />
  </div>
</template>
