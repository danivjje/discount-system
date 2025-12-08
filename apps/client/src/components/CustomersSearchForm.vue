<script setup lang="ts">
import { useCustomersStore } from '@/store';
import { ref, type Ref } from 'vue';
import { InputText, Button } from 'primevue';

const emit = defineEmits<{
  (e: 'resetPagination'): void;
}>();
const customersStore = useCustomersStore();

const searchInput: Ref<string> = ref('');

const handleSearchCustomers = (): void => {
  try {
    if (searchInput.value.trim()) {
      customersStore.searchValue = searchInput.value;
      emit('resetPagination');
      customersStore.fetchCustomers(1);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleResetSearch = (): void => {
  try {
    customersStore.searchValue = '';
    searchInput.value = '';
    emit('resetPagination');
    customersStore.fetchCustomers(1);
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <form @submit.prevent="handleSearchCustomers" class="flex items-center mb-3 self-baseline">
    <InputText v-model="searchInput" placeholder="Часть телефона" class="mr-2" />
    <Button type="submit">Поиск</Button>
    <Button v-if="customersStore.searchValue.trim()" class="ml-2" @click="handleResetSearch">Сбросить</Button>
  </form>
</template>
