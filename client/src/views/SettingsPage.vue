<script setup lang="ts">
import ConfigFormTemplate from '@/components/ConfigFormTemplate.vue';
</script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/" class="mb-10">Вернуться назад</RouterLink>
    <ConfigFormTemplate config-key="bonusPercent" title="Процент бонуса" input-type="number" />
  </div>
</template>
