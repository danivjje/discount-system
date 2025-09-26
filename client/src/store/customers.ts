import { getCustomers, patchCustomerResetBonuses, postCustomer } from '@/api';
import type { Customer, EnrollBonusesForm } from '@/types';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useCustomersStore = defineStore('customers', () => {
  const customers: Ref<Customer[]> = ref([]);

  const fetchCustomers = async (): Promise<void> => {
    try {
      customers.value = await getCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  const upsertCustomer = async (data: EnrollBonusesForm): Promise<void> => {
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
    fetchCustomers,
    upsertCustomer,
    resetCustomerBonuses,
  };
});
