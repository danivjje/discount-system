<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue';
import type { CountBonusesForm } from '@packages/types';
import { useCustomersStore } from '@/store';
import { parsePhoneFromMask } from '@/helpers/parse-phone-from-mask';
import type { $ZodFlattenedError } from 'zod/v4/core';
import z, { ZodError } from 'zod';
import { countBonusesFormScheme } from '@packages/schemes';

import InputErrors from '@/components/InputErrors.vue';
import { InputMask, InputNumber, Button, IftaLabel, useToast } from 'primevue';

const toast = useToast();
const customersStore = useCustomersStore();

const inputErrors: Ref<$ZodFlattenedError<CountBonusesForm> | null> = ref(null);
const countBonusesData: CountBonusesForm = reactive({
  phone: '',
  sum: 0,
});

const handleEnrollBonuses = async (): Promise<void> => {
  try {
    inputErrors.value = null;

    const data = countBonusesFormScheme.parse({
      phone: parsePhoneFromMask(countBonusesData.phone).phone,
      sum: countBonusesData.sum,
    });
    await customersStore.upsertCustomer(data);
    countBonusesData.phone = '';
    countBonusesData.sum = 0;
    toast.add({
      severity: 'success',
      summary: 'Бонусы успешно зачислены.',
      life: 3000,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      inputErrors.value = z.flattenError(err);
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleEnrollBonuses" class="flex flex-col items-stretch">
    <div class="mb-3">
      <IftaLabel>
        <InputMask
          id="phone-enroll"
          v-model="countBonusesData.phone"
          type="tel"
          mask="+38 (099) 999-99-99"
          placeholder="+38 (099) 999-99-99"
          :invalid="!!inputErrors?.fieldErrors?.phone?.length"
          class="w-full"
        />
        <label for="phone-enroll">Номер телефона</label>
      </IftaLabel>
      <InputErrors :errors="inputErrors?.fieldErrors.phone" />
    </div>
    <div class="mb-3">
      <IftaLabel>
        <InputNumber
          id="sum"
          v-model="countBonusesData.sum"
          :invalid="!!inputErrors?.fieldErrors?.sum?.length"
          class="w-full"
        />
        <label for="sum">Сумма</label>
        <InputErrors :errors="inputErrors?.fieldErrors.sum" />
      </IftaLabel>
    </div>
    <Button type="submit" class="align-center">Зачислить бонусы</Button>
  </form>
</template>
