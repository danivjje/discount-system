<script setup lang="ts">
import { useCustomersStore } from '@/store';
import { ref, type Ref } from 'vue';

import { InputMask, IftaLabel, Button } from 'primevue';
import { parsePhoneFromMask } from '@/helpers/parse-phone-from-mask';

const customersStore = useCustomersStore();

const phoneInputValue: Ref<string> = ref('');
const isRequestSent: Ref<boolean> = ref(false);

const handleShowBalance = async (): Promise<void> => {
  try {
    await customersStore.fetchCustomer(parsePhoneFromMask(phoneInputValue.value).phone);
    isRequestSent.value = true;
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="mb-6 flex flex-col items-center">
    <form @submit.prevent="handleShowBalance" class="mb-2 flex flex-col items-center">
      <IftaLabel>
        <InputMask
          id="phone-check"
          v-model="phoneInputValue"
          type="tel"
          mask="+38 (099) 999-99-99"
          placeholder="+38 (099) 999-99-99"
          class="mb-2"
        />
        <label for="phone-check">Номер телефона</label>
      </IftaLabel>
      <Button type="submit">Узнать баланс</Button>
    </form>
    <form v-if="isRequestSent" class="flex flex-col items-center">
      <strong class="mb-2 font-normal text-gray-800">Бонусов: {{ customersStore.selectedCustomer?.bonuses }}</strong>
      <Button>Списать бонусы</Button>
    </form>
  </div>
</template>
