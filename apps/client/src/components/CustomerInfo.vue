<script setup lang="ts">
import z from 'zod';
import { ZodError } from 'zod';
import { ref, type Ref } from 'vue';
import { verificationCodeScheme, type Customer } from '@packages/shared';
import { renderPhone } from '@/helpers/render-phone';
import { useCustomersStore, useToastsStore } from '@/store';
import { handleHttpError } from '@/helpers/handle-http-error';
import { sendVerificationCode, verifyVerificationCode } from '@/api';
import type { $ZodFlattenedError } from 'zod/v4/core';

import { Button, InputOtp } from 'primevue';
import InputErrors from '@/components/ui/InputErrors.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';

const emit = defineEmits<{
  (e: 'close'): void;
}>();
const { customer } = defineProps<{
  customer: Customer;
}>();

const toastsStore = useToastsStore();
const customersStore = useCustomersStore();

const isCodeSent: Ref<boolean> = ref(false);
const codeInputValue: Ref<string> = ref('');
const inputErrors: Ref<$ZodFlattenedError<unknown> | null> = ref(null);

const handleSendCode = async (): Promise<void> => {
  try {
    await sendVerificationCode(customer.phone);
    isCodeSent.value = true;
  } catch (err) {
    await handleHttpError(err, toastsStore);
  }
};

const handleResetBonuses = async (): Promise<void> => {
  try {
    inputErrors.value = null;
    const code = verificationCodeScheme.parse(codeInputValue.value);

    await verifyVerificationCode(customer.phone, code);
    await customersStore.resetCustomerBonuses(customer.phone);
    toastsStore.showSuccessToast('Бонусы успешно сброшены');

    isCodeSent.value = false;
    emit('close');
  } catch (err) {
    if (err instanceof ZodError) {
      inputErrors.value = z.flattenError(err);
    }
    await handleHttpError(err, toastsStore);
  } finally {
    codeInputValue.value = '';
  }
};
</script>

<template>
  <div class="relative flex flex-col p-4.5 sm:p-6">
    <header class="mb-4">
      <h4 class="font-bold">Клиент</h4>
      <strong class="text-surface-500 text-sm font-medium">{{ renderPhone(customer.phone) }}</strong>
    </header>
    <button class="absolute top-4 right-4 h-5 w-5" @click="() => emit('close')">
      <CloseIcon />
    </button>
    <div class="flex flex-col items-baseline">
      <strong
        class="rounded-border bg-surface-100 mb-5 flex w-full items-center gap-1 px-3.5 py-2.5 font-medium sm:px-4 sm:py-3"
      >
        Баланс:
        <span class="bg-surface-200 text-surface-700 rounded-border px-2 py-0.5">{{ customer.bonuses }}</span>
        бонусов
      </strong>
      <form v-if="isCodeSent" @submit.prevent="handleResetBonuses" class="flex w-full flex-col items-center">
        <strong class="mb-3 text-center font-medium">Введите код подтверждения</strong>
        <div class="mb-2 flex flex-col items-center">
          <InputOtp v-model="codeInputValue" size="small" integer-only :invalid="!!inputErrors" />
          <InputErrors :errors="inputErrors?.formErrors" />
        </div>
        <button
          @click.prevent
          class="text-surface-500 active:text-surface-600 mb-3 text-[16px] transition-opacity duration-300 hover:opacity-80"
        >
          Отправить код повторно (через n секунд)
        </button>
        <Button type="submit">Списать бонусы</Button>
      </form>
      <Button v-else :disabled="customer.bonuses === 0" @click="handleSendCode">Отправить код (SMS)</Button>
    </div>
  </div>
</template>
