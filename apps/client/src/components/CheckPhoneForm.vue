<script setup lang="ts">
import { useCustomersStore } from '@/store';
import { ref, type Ref } from 'vue';

import { InputMask, IftaLabel, Button } from 'primevue';

const customersStore = useCustomersStore();

const phoneInputValue: Ref<string> = ref('');
const isRequestSent: Ref<boolean> = ref(false);
// const isCodeSent: Ref<boolean> = ref(false);

const handleShowBalance = async (): Promise<void> => {
  await customersStore.fetchCustomer(phoneInputValue.value);
  isRequestSent.value = true;
};
</script>

<template>
  <div class="mb-5 flex flex-col items-center">
    <form @submit.prevent="handleShowBalance" class="mb-5 flex flex-col items-center">
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
      <Button>Узнать баланс</Button>
    </form>
    <form v-if="isRequestSent" class="flex flex-col items-center">
      <!-- <Input type="text" placeholder="Код" class="mb-2" /> -->
      <strong class="mb-2">Бонусов: {{ customersStore.selectedCustomer?.bonuses }}</strong>
      <Button>Списать бонусы</Button>
    </form>
    <!-- <div v-if="isCodeSent">
      <strong>Номер телефона:</strong>
      <strong>Баланс: 0 бонусов</strong>
    </div> -->
  </div>
</template>
