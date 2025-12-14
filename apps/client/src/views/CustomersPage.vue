<script setup lang="ts">
import { onMounted } from 'vue';
import { useCustomersStore } from '@/store';

import CustomersTable from '@/components/CustomersTable.vue';
import NavigationPageTemplate from '@/components/ui/NavigationPageTemplate.vue';

const customersStore = useCustomersStore();

onMounted(() => {
  if (customersStore.customersData.customers.length === 0) {
    customersStore.fetchCustomers(1);
  }
});
</script>

<template>
  <NavigationPageTemplate>
    <CustomersTable />
  </NavigationPageTemplate>
</template>
