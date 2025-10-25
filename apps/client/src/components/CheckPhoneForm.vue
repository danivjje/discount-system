<script setup lang="ts">
import { useCustomersStore } from '@/store';
import { ref, type Ref } from 'vue';
import { parsePhoneFromMask } from '@/helpers/parse-phone-from-mask';
import type { $ZodFlattenedError } from 'zod/v4/core';
import { phoneScheme } from '@packages/schemes';
import z, { ZodError } from 'zod';

import { InputMask, IftaLabel, Button } from 'primevue';
import InputErrors from '@/components/InputErrors.vue';

const customersStore = useCustomersStore();

const inputErrors: Ref<$ZodFlattenedError<unknown> | null> = ref(null);
const phoneInputValue: Ref<string> = ref('');
const isRequestSent: Ref<boolean> = ref(false);

const handleShowBalance = async (): Promise<void> => {
  try {
    inputErrors.value = null;
    const phone: string = phoneScheme.parse(parsePhoneFromMask(phoneInputValue.value).phone);

    await customersStore.fetchCustomer(phone);
    isRequestSent.value = true;
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(z.flattenError(err));
      inputErrors.value = z.flattenError(err);
    }
  }
};
</script>

<template>
  <div class="mb-6 flex flex-col items-center">
    <form @submit.prevent="handleShowBalance" class="mb-2 flex flex-col items-stretch">
      <div class="mb-3">
        <IftaLabel>
          <InputMask
            id="phone-check"
            v-model="phoneInputValue"
            type="tel"
            mask="+38 (099) 999-99-99"
            placeholder="+38 (099) 999-99-99"
            :invalid="!!inputErrors?.formErrors?.length"
            class="w-full"
          />
          <label for="phone-check">Номер телефона</label>
        </IftaLabel>
        <InputErrors :errors="inputErrors?.formErrors" />
      </div>
      <Button type="submit">Узнать баланс</Button>
    </form>
    <form v-if="isRequestSent" class="flex flex-col items-center">
      <strong class="mb-2 font-normal text-gray-800">Бонусов: {{ customersStore.selectedCustomer?.bonuses }}</strong>
      <Button>Списать бонусы</Button>
    </form>
  </div>
</template>
