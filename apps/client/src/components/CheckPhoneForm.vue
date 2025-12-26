<script setup lang="ts">
import { useCustomersStore } from '@/store';
import { nextTick, ref, type Ref } from 'vue';
import type { $ZodFlattenedError } from 'zod/v4/core';
import { phoneScheme } from '@packages/shared';
import z, { ZodError } from 'zod';

import { InputMask, IftaLabel, Button, Dialog } from 'primevue';
import InputErrors from '@/components/ui/InputErrors.vue';
import CustomerInfo from '@/components/CustomerInfo.vue';

const customersStore = useCustomersStore();

const inputErrors: Ref<$ZodFlattenedError<unknown> | null> = ref(null);
const phoneInputValue: Ref<string> = ref('');
const isPhoneInputVisible: Ref<boolean> = ref(true);
const isModalVisible: Ref<boolean> = ref(false);

const handleShowBalance = async (): Promise<void> => {
  try {
    inputErrors.value = null;
    const phone: string = phoneScheme.parse(`380${phoneInputValue.value}`);

    await customersStore.fetchCustomer(phone);

    isModalVisible.value = true;
  } catch (err) {
    if (err instanceof ZodError) {
      inputErrors.value = z.flattenError(err);
    }
  }
};

const handleCloseModal = (): void => {
  isModalVisible.value = false;

  phoneInputValue.value = '';
  isPhoneInputVisible.value = false; // without this trick primevue can't fully reset input value
  nextTick(() => {
    isPhoneInputVisible.value = true;
  });
};
</script>

<template>
  <form @submit.prevent="handleShowBalance" class="mb-6 flex w-full flex-col items-stretch sm:w-fit">
    <div class="mb-3">
      <IftaLabel>
        <InputMask
          v-if="isPhoneInputVisible"
          unmask
          data-test="check-phone"
          id="check-phone"
          v-model="phoneInputValue"
          type="tel"
          mask="+38 (099) 999-99-99"
          placeholder="+38 (099) 999-99-99"
          :invalid="!!inputErrors?.formErrors?.length"
          class="w-full"
        />
        <label for="check-phone">Номер телефона</label>
      </IftaLabel>
      <InputErrors :errors="inputErrors?.formErrors" />
    </div>
    <Button data-test="check-submit" type="submit">Узнать баланс</Button>
  </form>
  <Dialog v-model:visible="isModalVisible" modal :draggable="false" class="w-full max-w-115">
    <template #container>
      <CustomerInfo
        v-if="customersStore.selectedCustomer"
        :customer="customersStore.selectedCustomer"
        @close="handleCloseModal"
      />
    </template>
  </Dialog>
</template>
