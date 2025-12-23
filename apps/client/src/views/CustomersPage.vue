<script setup lang="ts">
import { onMounted } from 'vue';
import { useCustomersStore } from '@/store';

import CustomersTable from '@/components/CustomersTable.vue';
import CustomersSearchForm from '@/components/CustomersSearchForm.vue';
import NavigationPageTemplate from '@/components/ui/NavigationPageTemplate.vue';

const customersStore = useCustomersStore();

onMounted(() => {
  if (!customersStore.customersData.customers.length) {
    try {
      customersStore.fetchCustomers(1);
    } catch (err) {}
  }
});
</script>

<template>
  <NavigationPageTemplate>
    <CustomersSearchForm />
    <CustomersTable />
  </NavigationPageTemplate>
</template>
