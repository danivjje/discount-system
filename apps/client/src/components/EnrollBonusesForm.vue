<script setup lang="ts">
import { reactive } from 'vue';
import type { CountBonusesForm } from '@packages/types';
import { useCustomersStore } from '@/store';

import { InputMask, InputNumber, Button, IftaLabel } from 'primevue';

const customersStore = useCustomersStore();

const enrollBonusesData: CountBonusesForm = reactive({
  phone: '',
  sum: 0,
});
</script>

<template>
  <form
    @submit.prevent="customersStore.upsertCustomer(enrollBonusesData.phone, { sum: enrollBonusesData.sum })"
    class="flex flex-col items-center"
  >
    <IftaLabel>
      <InputMask
        id="phone-enroll"
        v-model="enrollBonusesData.phone"
        type="tel"
        mask="+38 (099) 999-99-99"
        placeholder="+38 (099) 999-99-99"
        class="mb-2"
      />
      <label for="phone-enroll">Номер телефона</label>
    </IftaLabel>
    <IftaLabel>
      <InputNumber id="sum" v-model="enrollBonusesData.sum" class="mb-2" />
      <label for="sum">Сумма</label>
    </IftaLabel>
    <Button>Зачислить бонусы</Button>
  </form>
</template>
