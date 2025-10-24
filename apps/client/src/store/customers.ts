import { getCustomer, getCustomers, patchCustomerResetBonuses, postCustomer } from '@/api';
import type { Customer } from '@packages/types';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { CountBonusesForm } from '@packages/types';

export const useCustomersStore = defineStore('customers', () => {
  const customers: Ref<Customer[]> = ref([]);
  const selectedCustomer: Ref<Customer | null> = ref(null);

  const fetchCustomers = async (): Promise<void> => {
    try {
      const data = await getCustomers();
      console.log(data);
      customers.value = data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCustomer = async (phone: string): Promise<void> => {
    try {
      selectedCustomer.value = await getCustomer(phone);
    } catch (err) {
      console.log(err);
    }
  };

  const upsertCustomer = async (data: CountBonusesForm): Promise<void> => {
    try {
      const updatedCustomer: Customer = await postCustomer(data);
      customers.value[customers.value.findIndex((customer) => customer.id === updatedCustomer.id)];
    } catch (err) {
      console.log(err);
    }
  };

  const resetCustomerBonuses = async (phone: string): Promise<void> => {
    try {
      const updatedCustomer: Customer = await patchCustomerResetBonuses(phone);
      customers.value[customers.value.findIndex((customer) => customer.id === updatedCustomer.id)];
    } catch (err) {
      console.log(err);
    }
  };

  return {
    customers,
    selectedCustomer,
    fetchCustomers,
    fetchCustomer,
    upsertCustomer,
    resetCustomerBonuses,
  };
});
