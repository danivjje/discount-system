<script setup lang="ts">
import type { Customer } from '@/types';
import { toRefs } from 'vue';

const props = defineProps<{
  customers: Customer[];
}>();
const { customers } = toRefs(props);
</script>

<template>
  <table class="w-full">
    <thead>
      <tr>
        <th>Номер телефона</th>
        <th>Бонусы</th>
        <th>Общая сумма</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{ customer.phone }}</td>
        <td>{{ customer.bonuses }}</td>
        <td>{{ customer.totalSum }}</td>
      </tr>
    </tbody>
  </table>
</template>
