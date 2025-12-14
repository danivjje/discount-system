<script setup lang="ts">
import { useCustomersStore } from '@/store';
import { ref, type Ref } from 'vue';
import { parsePhoneFromMask } from '@/helpers/parse-phone-from-mask';
import type { $ZodFlattenedError } from 'zod/v4/core';
import { phoneScheme } from '@packages/schemes';
import z, { ZodError } from 'zod';

import { InputMask, IftaLabel, Button, Dialog } from 'primevue';
import InputErrors from '@/components/ui/InputErrors.vue';
import CustomerInfo from '@/components/CustomerInfo.vue';

const customersStore = useCustomersStore();

const inputErrors: Ref<$ZodFlattenedError<unknown> | null> = ref(null);
const phoneInputValue: Ref<string> = ref('');
const isModalVisible: Ref<boolean> = ref(false);

const handleShowBalance = async (): Promise<void> => {
  try {
    inputErrors.value = null;
    const phone: string = phoneScheme.parse(parsePhoneFromMask(phoneInputValue.value).phone);

    await customersStore.fetchCustomer(phone);
    // delete if
    if (customersStore.selectedCustomer) {
      isModalVisible.value = true;
    }
  } catch (err) {
    if (err instanceof ZodError) {
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
    <Dialog v-model:visible="isModalVisible" modal :draggable="false" class="max-w-[450px] w-full">
      <template #container="{ closeCallback }">
        <CustomerInfo
          v-if="customersStore.selectedCustomer"
          :customer="customersStore.selectedCustomer"
          @close="closeCallback"
        />
      </template>
    </Dialog>
  </div>
</template>
