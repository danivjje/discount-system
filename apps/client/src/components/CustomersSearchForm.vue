<script setup lang="ts">
import { useCustomersStore } from '@/store';
import { ref, type Ref } from 'vue';
import { InputText, Button } from 'primevue';

const emit = defineEmits<{
  (e: 'resetPagination'): void;
}>();
const customersStore = useCustomersStore();

const searchInput: Ref<string> = ref('');

const handleSearchCustomers = async (): Promise<void> => {
  try {
    if (searchInput.value.trim()) {
      await customersStore.fetchCustomers(1);

      customersStore.searchValue = searchInput.value;
      emit('resetPagination');
    }
  } catch (err) {}
};

const handleResetSearch = async (): Promise<void> => {
  try {
    await customersStore.fetchCustomers(1);

    customersStore.searchValue = '';
    searchInput.value = '';
    emit('resetPagination');
  } catch (err) {}
};
</script>

<template>
  <form @submit.prevent="handleSearchCustomers" class="mb-3 flex w-full flex-col items-center sm:flex-row">
    <InputText v-model="searchInput" placeholder="Часть телефона" class="mb-2 w-full sm:mr-2 sm:mb-0 sm:w-fit" />
    <div class="flex w-full">
      <Button type="submit" class="w-full sm:w-fit">Поиск</Button>
      <Button v-if="customersStore.searchValue.trim()" class="ml-2 w-full sm:w-fit" @click="handleResetSearch"
        >Сбросить</Button
      >
    </div>
  </form>
</template>
