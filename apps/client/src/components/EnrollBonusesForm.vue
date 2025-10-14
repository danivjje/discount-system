<script setup lang="ts">
import { reactive } from 'vue';
import type { EnrollBonusesForm } from '@/types';
import { useCustomersStore } from '@/store';

const customersStore = useCustomersStore();

const enrollBonusesData: EnrollBonusesForm = reactive({
  phone: '',
  sum: 0,
});
</script>

<template>
  <form
    @submit.prevent="customersStore.upsertCustomer(enrollBonusesData.phone, { sum: enrollBonusesData.sum })"
    class="flex flex-col items-center"
  >
    <Input v-model="enrollBonusesData.phone" type="tel" placeholder="Номер телефона" class="mb-2" />
    <Input v-model.number="enrollBonusesData.sum" type="text" placeholder="Сумма" class="mb-2" />
    <Button>Зачислить бонусы</Button>
  </form>
</template>
