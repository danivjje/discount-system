import { defineStore } from 'pinia';
import type { AppConfig, Customer } from '@/types';
import { type Ref, ref } from 'vue';
import { getConfig, getCustomer, getCustomers, postConfig, postCustomer } from '@/api';

export const useCommonStore = defineStore('common', () => {
  const customers: Ref<Customer[]> = ref([]);
  const selectedCustomer: Ref<Customer | null> = ref(null);
  const appConfig: Ref<AppConfig | null> = ref(null);

  const fetchCustomers = async () => {
    try {
      customers.value = await getCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  const selectCustomer = async (phone: string) => {
    try {
      selectedCustomer.value = await getCustomer(phone);
    } catch (err) {
      console.log(err);
    }
  };

  const upsertCustomer = async (phone: string, sum: number) => {
    try {
      await postCustomer({ phone, sum });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConfig = async () => {
    try {
      appConfig.value = await getConfig();
    } catch (err) {
      console.log(err);
    }
  };

  const updateConfig = async () => {
    try {
      await postConfig(appConfig.value as AppConfig);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    customers,
    selectedCustomer,
    fetchCustomers,
    selectCustomer,
    upsertCustomer,
    fetchConfig,
    updateConfig,
  };
});
