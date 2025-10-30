<script setup lang="ts">
import { onMounted } from 'vue';
import { useCustomersStore, useToastsStore } from '@/store';
import { handleHttpError } from '@/helpers/handle-http-error';

import CustomersTable from '@/components/CustomersTable.vue';

const toastsStore = useToastsStore();
const customersStore = useCustomersStore();

const fetchCustomers = async () => {
  if (customersStore.customers.length === 0) {
    try {
      customersStore.fetchCustomers();
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  }
};

onMounted(() => {
  fetchCustomers();
});
</script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/" class="mb-10 text-gray-800 text-base">Вернуться назад</RouterLink>
    <CustomersTable :customers="customersStore.customers" />
  </div>
</template>
