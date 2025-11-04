<script setup lang="ts">
import { onMounted } from 'vue';
import { useCustomersStore } from '@/store';
import CustomersTable from '@/components/CustomersTable.vue';

const customersStore = useCustomersStore();

onMounted(() => {
  if (customersStore.customers.length === 0) {
    customersStore.fetchCustomers();
  }
});
</script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/" class="mb-10 text-gray-800 text-base">Вернуться назад</RouterLink>
    <CustomersTable :customers="customersStore.customers" />
  </div>
</template>
