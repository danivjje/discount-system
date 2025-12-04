<script setup lang="ts">
import { Paginator, InputText, Button } from 'primevue';
import { useCustomersStore } from '@/store';
import { reactive, ref, type Ref } from 'vue';
import SortIcon from '@/components/icons/SortIcon.vue';
import type { SortField, SortParam } from '@packages/types';

const customersStore = useCustomersStore();

const firstElem: Ref<number> = ref(1);
const searchInput: Ref<string> = ref('');
const activeSearchValue: Ref<string> = ref('');
const sort: { [P in keyof SortParam]: SortParam[P] | null } = reactive({
  sort: null,
  order: null,
});

const handleSearchCustomers = (): void => {
  try {
    if (searchInput.value.trim()) {
      activeSearchValue.value = searchInput.value;
      firstElem.value = 1;
      customersStore.fetchCustomers(1, activeSearchValue.value);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleResetSearch = (): void => {
  try {
    activeSearchValue.value = '';
    searchInput.value = '';
    firstElem.value = 1;
    customersStore.fetchCustomers(1);
  } catch (err) {
    console.log(err);
  }
};

const handleSort = async (field: SortField): Promise<void> => {
  try {
    // first click - desc, second click - asc, third click - null
    if (sort.sort === field) {
      sort.order = !sort.order ? 'desc' : sort.order === 'desc' ? 'asc' : null;
      if (sort.order === null) sort.sort = null;
    } else {
      sort.sort = field;
      sort.order = 'desc';
    }

    await customersStore.fetchCustomers(1, activeSearchValue.value ?? undefined, { ...sort } as SortParam);
    firstElem.value = 1;
  } catch (err) {
    console.log(err);
  }
};

const handlePaginate = (page: number) => {
  const searchValue: string | undefined = activeSearchValue.value.trim() ?? undefined;
  const sortValue: SortParam | undefined = sort.sort && sort.order ? ({ ...sort } as SortParam) : undefined;
  customersStore.fetchCustomers(page, searchValue, sortValue);
};
</script>

<template>
  <form @submit.prevent="handleSearchCustomers" class="flex items-center mb-3 self-baseline">
    <input-text v-model="searchInput" placeholder="Часть телефона" class="mr-2" />
    <Button type="submit">Поиск</Button>
    <Button v-if="activeSearchValue.trim()" class="ml-2" @click="handleResetSearch">Сбросить</Button>
  </form>
  <table class="w-full mb-3">
    <thead>
      <tr>
        <th class="font-semibold text-gray-700 border border-solid border-gray-200 p-2">Номер телефона</th>
        <th
          class="font-semibold text-gray-700 border border-solid border-gray-200 p-2"
          :class="{ 'bg-gray-200': sort.sort === 'bonuses' }"
        >
          <button class="flex items-center w-full justify-center" @click="handleSort('bonuses')">
            <span class="mr-2">Бонусы</span>
            <SortIcon
              class="w-6 h-6 text-gray-700 translate-y-0.5"
              :class="{ '-scale-100': sort.sort === 'bonuses' && sort.order === 'asc' }"
            />
          </button>
        </th>
        <th
          class="font-semibold text-gray-700 border border-solid border-gray-200 p-2"
          :class="{ 'bg-gray-200': sort.sort === 'totalSum' }"
        >
          <button class="flex items-center w-full justify-center" @click="handleSort('totalSum')">
            <span class="mr-2">Общая сумма</span>
            <SortIcon
              class="w-6 h-6 text-gray-700 translate-y-0.5"
              :class="{ '-scale-100': sort.sort === 'totalSum' && sort.order === 'asc' }"
            />
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in customersStore.customersData.customers" :key="customer.id">
        <td class="font-medium text-gray-700 border border-solid border-gray-200 p-2">{{ customer.phone }}</td>
        <td class="font-medium text-gray-700 border border-solid border-gray-200 p-2">{{ customer.bonuses }}</td>
        <td class="font-medium text-gray-700 border border-solid border-gray-200 p-2">{{ customer.totalSum }}</td>
      </tr>
    </tbody>
  </table>
  <paginator
    v-model:first="firstElem"
    :rows="10"
    :totalRecords="customersStore.customersData.total"
    @page="(page) => handlePaginate(page.page + 1)"
  />
</template>
