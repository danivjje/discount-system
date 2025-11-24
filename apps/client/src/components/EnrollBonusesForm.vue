<script setup lang="ts">
import { reactive, ref, toRaw, type Ref } from 'vue';
import type { CountBonusesForm } from '@packages/types';
import { useCustomersStore, useToastsStore } from '@/store';
import { parsePhoneFromMask } from '@/helpers/parse-phone-from-mask';
import type { $ZodFlattenedError } from 'zod/v4/core';
import z, { ZodError } from 'zod';
import { countBonusesFormScheme } from '@packages/schemes';

import InputErrors from '@/components/InputErrors.vue';
import { InputMask, InputNumber, Button, IftaLabel } from 'primevue';

const toastsStore = useToastsStore();
const customersStore = useCustomersStore();

const inputErrors: Ref<$ZodFlattenedError<CountBonusesForm> | null> = ref(null);
const countBonusesData: CountBonusesForm = reactive({
  phone: '',
  sum: 0,
});

const handleEnrollBonuses = async (): Promise<void> => {
  try {
    inputErrors.value = null;

    const data = { phone: parsePhoneFromMask(countBonusesData.phone).phone, sum: countBonusesData.sum };
    const parsedData = countBonusesFormScheme.parse(toRaw(data));

    await customersStore.upsertCustomer(parsedData);
    countBonusesData.phone = '';
    countBonusesData.sum = 0;
    toastsStore.showSuccessToast('Бонусы успешно зачислены');
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
          data-test="enroll-phone"
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
          data-test="enroll-sum"
          id="sum"
          v-model="countBonusesData.sum"
          :invalid="!!inputErrors?.fieldErrors?.sum?.length"
          class="w-full"
        />
        <label for="sum">Сумма</label>
        <InputErrors :errors="inputErrors?.fieldErrors.sum" />
      </IftaLabel>
    </div>
    <Button data-test="enroll-submit" type="submit" class="align-center">Зачислить бонусы</Button>
  </form>
</template>
