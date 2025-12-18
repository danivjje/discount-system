<script setup lang="ts">
import { useCustomersStore } from '@/store';
import { reactive, ref, type Ref } from 'vue';
import type { SortTableOption } from '@/types';
import type { SortField, SortParam } from '@packages/types';

import { Paginator } from 'primevue';
import SortIcon from '@/components/icons/SortIcon.vue';
import CustomersSearchForm from '@/components/CustomersSearchForm.vue';

const customersStore = useCustomersStore();

const firstElem: Ref<number> = ref(1);
const sort: { [P in keyof SortParam]: SortParam[P] | null } = reactive({
  sort: null,
  order: null,
});

const sortTableOptions: SortTableOption[] = [
  { title: 'Бонусы', label: 'bonuses' },
  { title: 'Общая сумма', label: 'totalSum' },
];

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

    await customersStore.fetchCustomers(1, { ...sort } as SortParam);
    firstElem.value = 1;
  } catch (err) {
    console.log(err);
  }
};

const handlePaginate = (page: number): void => {
  const sortValue: SortParam | undefined = sort.sort && sort.order ? ({ ...sort } as SortParam) : undefined;
  customersStore.fetchCustomers(page, sortValue);
};

const handleResetPagination = (): void => {
  firstElem.value = 1;
};
</script>

<template>
  <CustomersSearchForm @resetPagination="handleResetPagination" />
  <div class="w-full overflow-x-auto">
    <table class="mb-3 w-full min-w-125 overflow-x-scroll">
      <thead>
        <tr>
          <th class="border border-solid border-gray-200 p-2 font-semibold text-gray-700">Номер телефона</th>
          <th
            v-for="option in sortTableOptions"
            :key="option.label"
            class="border border-solid border-gray-200 p-2 font-semibold text-gray-700"
            :class="{ 'bg-gray-200': sort.sort === option.label }"
          >
            <button class="flex w-full items-center justify-center" @click="handleSort(option.label)">
              <span class="mr-2">{{ option.title }}</span>
              <SortIcon
                class="h-6 w-6 translate-y-0.5 text-gray-700"
                :class="{ '-scale-100': sort.sort === option.label && sort.order === 'asc' }"
              />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customersStore.customersData.customers" :key="customer.id">
          <td class="border border-solid border-gray-200 p-2 font-medium text-gray-700">
            {{ customer.phone }}
          </td>
          <td class="border border-solid border-gray-200 p-2 font-medium text-gray-700">
            {{ customer.bonuses }}
          </td>
          <td class="border border-solid border-gray-200 p-2 font-medium text-gray-700">
            {{ customer.totalSum }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Paginator
    :template="{
      '640px': 'PrevPageLink CurrentPageReport NextPageLink',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
    }"
    currentPageReportTemplate="{currentPage} из {totalPages}"
    v-model:first="firstElem"
    :rows="10"
    :totalRecords="customersStore.customersData.total"
    @page="(page) => handlePaginate(page.page + 1)"
  />
</template>
