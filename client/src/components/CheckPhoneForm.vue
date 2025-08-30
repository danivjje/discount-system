<script setup lang="ts">
import { ref, type Ref } from 'vue';

const phoneInputValue: Ref<string> = ref('');
const isCodeSent: Ref<boolean> = ref(false);
</script>

<template>
  <form @submit.prevent class="mb-5 flex flex-col items-center">
    <div v-if="isCodeSent" class="flex flex-col items-center">
      <Input v-model="phoneInputValue" type="tel" placeholder="Номер телефона" class="mb-2" />
      <Button type="submit">Узнать баланс</Button>
    </div>
    <div v-else class="flex flex-col items-center">
      <Input type="text" placeholder="Код" class="mb-2" />
      <Button type="submit">Списать бонусы</Button>
    </div>
    <div v-if="isCodeSent">
      <strong>Номер телефона:</strong>
      <strong>Баланс: 0 бонусов</strong>
    </div>
  </form>
</template>
