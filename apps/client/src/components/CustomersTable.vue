<script setup lang="ts">
import { reactive } from 'vue';
import type { ColumnConfig } from '@/types';
import { useCustomersStore } from '@/store';
import { renderPhone } from '@/helpers/render-phone';
import { renderNumber } from '@/helpers/render-number';
import type { SortField, SortParam } from '@packages/shared';

import { DataTable, Column, Paginator, type DataTableSortEvent } from 'primevue';

const customersStore = useCustomersStore();

const sort: { [P in keyof SortParam]: SortParam[P] | null } = reactive({
  sort: null,
  order: null,
});

const columnsData: ColumnConfig[] = [
  { header: 'Номер телефона', field: 'phone', isSortable: false, render: (v) => renderPhone(v as string) },
  { header: 'Бонусы', field: 'bonuses', isSortable: true, render: (v) => renderNumber(v as number, false) },
  { header: 'Общая сумма', field: 'totalSum', isSortable: true, render: (v) => renderNumber(v as number, true) },
];

const handleSort = async (data: DataTableSortEvent): Promise<void> => {
  try {
    if (data.sortOrder === null) {
      sort.order = null;
      sort.sort = null;
    } else {
      sort.sort = data.sortField as SortField;
      sort.order = data.sortOrder === 1 ? 'asc' : 'desc';
    }

    await customersStore.fetchCustomers(1, sort.sort ? ({ ...sort } as SortParam) : undefined);
    customersStore.paginationFirstElement = 1;
  } catch (err) {}
};

const handlePaginate = (page: number): void => {
  try {
    const sortValue: SortParam | undefined = sort.sort && sort.order ? ({ ...sort } as SortParam) : undefined;
    customersStore.fetchCustomers(page, sortValue);
  } catch (err) {}
};
</script>

<template>
  <DataTable
    lazy
    paginator
    stripedRows
    showGridlines
    removableSort
    :rows="10"
    class="w-full"
    tableClass="min-w-125"
    :value="customersStore.customersData.customers"
    :totalRecords="customersStore.customersData.total"
    @sort="(data) => handleSort(data)"
  >
    <Column
      v-for="col of columnsData"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="col.isSortable"
      :pt="{ columnHeaderContent: 'justify-center' }"
    >
      <template #body="{ data }">
        <span class="block w-full text-center">{{ col.render(data[col.field]) }}</span>
      </template>
    </Column>

    <template #paginatorcontainer="{ totalRecords, rows }">
      <Paginator
        :rows
        :totalRecords
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          default: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        }"
        currentPageReportTemplate="{currentPage} из {totalPages}"
        @page="(page) => handlePaginate(page.page + 1)"
      />
    </template>
  </DataTable>
</template>
