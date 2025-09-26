<script setup lang="ts">
import { onMounted } from 'vue';
import CustomersTable from '@/components/CustomersTable.vue';
import { useCustomersStore } from '@/store';

const customersStore = useCustomersStore();

onMounted(() => {
  customersStore.fetchCustomers();
});
</script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/" class="mb-10">Вернуться назад</RouterLink>
    <CustomersTable :customers="customersStore.customers" />
  </div>
</template>
