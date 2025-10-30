import { getCustomer, getCustomers, patchCustomerResetBonuses, postCustomer } from '@/api';
import type { Customer } from '@packages/types';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { CountBonusesForm } from '@packages/types';
import { useToastsStore } from './toasts';
import { handleHttpError } from '@/helpers/handle-http-error';

export const useCustomersStore = defineStore('customers', () => {
  const toastsStore = useToastsStore();
  const customers: Ref<Customer[]> = ref([]);
  const selectedCustomer: Ref<Customer | null> = ref(null);

  const fetchCustomers = async (): Promise<void> => {
    try {
      const data = await getCustomers();
      console.log(data);
      customers.value = data;
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  };

  const fetchCustomer = async (phone: string): Promise<void> => {
    try {
      selectedCustomer.value = await getCustomer(phone);
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  };

  const upsertCustomer = async (data: CountBonusesForm): Promise<void> => {
    try {
      const updatedCustomer: Customer = await postCustomer(data);
      const customerIndex: number = customers.value.findIndex((customer) => customer.id === updatedCustomer.id);
      if (customerIndex > -1) {
        (customers.value[customerIndex] as Customer) = updatedCustomer;
        if (selectedCustomer.value && selectedCustomer.value.id === updatedCustomer.id) {
          selectedCustomer.value = updatedCustomer;
        }
      }
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  };

  const resetCustomerBonuses = async (phone: string): Promise<void> => {
    try {
      const updatedCustomerPhone: { phone: string } = await patchCustomerResetBonuses(phone);
      const customerIndex: number = customers.value.findIndex((customer) => {
        return customer.phone === updatedCustomerPhone.phone;
      });
      if (customerIndex > -1) {
        if (selectedCustomer.value && selectedCustomer.value.phone === updatedCustomerPhone.phone) {
          selectedCustomer.value = { ...selectedCustomer.value, bonuses: 0 };
        }
      }
    } catch (err) {
      await handleHttpError(err, toastsStore);
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
