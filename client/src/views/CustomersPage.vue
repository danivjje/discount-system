<script setup lang="ts">
import { type Ref, ref } from 'vue';

interface Customer {
  id: number;
  phone: number;
  bonuses: number;
  totalSum: number;
}

const customers: Ref<Customer[]> = ref([]);
</script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/" class="mb-10">Вернуться назад</RouterLink>
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
  </div>
</template>
