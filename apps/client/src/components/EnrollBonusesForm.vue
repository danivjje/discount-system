<script setup lang="ts">
import { nextTick, reactive, ref, toRaw, type Ref } from 'vue';
import type { CountBonusesForm } from '@packages/types';
import { useCustomersStore, useToastsStore } from '@/store';
import type { $ZodFlattenedError } from 'zod/v4/core';
import z, { ZodError } from 'zod';
import { countBonusesFormScheme } from '@packages/schemes';

import InputErrors from '@/components/ui/InputErrors.vue';
import { InputMask, InputNumber, Button, IftaLabel } from 'primevue';

const toastsStore = useToastsStore();
const customersStore = useCustomersStore();

const isPhoneInputVisible: Ref<boolean> = ref(true);
const inputErrors: Ref<$ZodFlattenedError<CountBonusesForm> | null> = ref(null);
const countBonusesData: CountBonusesForm = reactive({
  phone: '',
  sum: 0,
});

const handleEnrollBonuses = async (): Promise<void> => {
  try {
    inputErrors.value = null;

    const data = { phone: `380${countBonusesData.phone}`, sum: countBonusesData.sum };
    const parsedData = countBonusesFormScheme.parse(toRaw(data));

    await customersStore.upsertCustomer(parsedData);

    toastsStore.showSuccessToast('Бонусы успешно зачислены');
  } catch (err) {
    if (err instanceof ZodError) {
      inputErrors.value = z.flattenError(err);
    }
  } finally {
    countBonusesData.phone = '';
    countBonusesData.sum = 0;

    // without this trick primevue can't fully reset input value
    isPhoneInputVisible.value = false;
    nextTick(() => {
      isPhoneInputVisible.value = true;
    });
  }
};
</script>

<template>
  <form @submit.prevent="handleEnrollBonuses" class="flex w-full flex-col items-stretch sm:w-fit">
    <div class="mb-3">
      <IftaLabel>
        <InputMask
          v-if="isPhoneInputVisible"
          unmask
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
