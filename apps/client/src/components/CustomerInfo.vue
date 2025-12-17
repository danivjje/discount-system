<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { Customer } from '@packages/types';
import { renderPhone } from '@/helpers/render-phone';
import { useCustomersStore, useToastsStore } from '@/store';
import { handleHttpError } from '@/helpers/handle-http-error';
import { sendVerificationCode, verifyVerificationCode } from '@/api';

import { Button, InputOtp } from 'primevue';
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

const handleSendCode = async (): Promise<void> => {
  try {
    isCodeSent.value = true;
    await sendVerificationCode(customer.phone);
  } catch (err) {
    await handleHttpError(err, toastsStore);
  }
};

const handleResetBonuses = async (): Promise<void> => {
  try {
    // confirm code
    await verifyVerificationCode(customer.phone, codeInputValue.value);
    await customersStore.resetCustomerBonuses(customer.phone);
    toastsStore.showSuccessToast('Бонусы успешно сброшены');

    isCodeSent.value = false;
    emit('close');
  } catch (err) {
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
        <InputOtp v-model="codeInputValue" class="mb-2" size="small" integer-only />
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
