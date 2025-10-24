<script setup lang="ts">
import { reactive } from 'vue';
import type { CountBonusesForm } from '@packages/types';
import { useCustomersStore } from '@/store';

import { InputMask, InputNumber, Button, IftaLabel } from 'primevue';
import { parsePhoneFromMask } from '@/helpers/parse-phone-from-mask';

const customersStore = useCustomersStore();

const countBonusesData: CountBonusesForm = reactive({
  phone: '',
  sum: 0,
});

const handleEnrollBonuses = async (): Promise<void> => {
  try {
    await customersStore.upsertCustomer({
      phone: parsePhoneFromMask(countBonusesData.phone).phone,
      sum: countBonusesData.sum,
    });
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <form @submit.prevent="handleEnrollBonuses" class="flex flex-col items-center">
    <IftaLabel>
      <InputMask
        id="phone-enroll"
        v-model="countBonusesData.phone"
        type="tel"
        mask="+38 (099) 999-99-99"
        placeholder="+38 (099) 999-99-99"
        class="mb-2"
      />
      <label for="phone-enroll">Номер телефона</label>
    </IftaLabel>
    <IftaLabel>
      <InputNumber id="sum" v-model="countBonusesData.sum" class="mb-2" />
      <label for="sum">Сумма</label>
    </IftaLabel>
    <Button type="submit">Зачислить бонусы</Button>
  </form>
</template>
