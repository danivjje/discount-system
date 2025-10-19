<script setup lang="ts">
import type { Customer } from '@packages/types';
import { toRefs } from 'vue';

import { DataTable, Column } from 'primevue';

const props = defineProps<{
  customers: Customer[];
}>();
const { customers } = toRefs(props);
</script>

<template>
  <data-table :value="customers" class="w-full">
    <column field="phone" header="Номер телефона" />
    <column field="bonuses" header="Бонусы" />
    <column field="totalSum" header="Общая сумма" />
  </data-table>
</template>
