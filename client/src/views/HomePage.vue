<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';

interface EnrollBonusesData {
  phone: string;
  sum: string;
}

const getBonusInfoPhone: Ref<string> = ref('');
const enrollBonusesData: EnrollBonusesData = reactive({
  phone: '',
  sum: '',
});
</script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/customers" class="mb-[100px]">Список покупателей</RouterLink>
    <form @submit.prevent class="mb-5 flex flex-col items-center">
      <input v-model="getBonusInfoPhone" type="tel" placeholder="Номер телефона" class="mb-2 px-5 py-2" />
      <button class="bg-gray-100 px-5 py-2">Отправить смс</button>
    </form>
    <form @submit.prevent class="flex flex-col items-center">
      <input v-model="enrollBonusesData.phone" type="tel" placeholder="Номер телефона" class="mb-2 px-5 py-2" />
      <input v-model="enrollBonusesData.sum" type="text" placeholder="Сумма" class="mb-2 px-5 py-2" />
      <button class="bg-gray-100 px-5 py-2">Зачислить бонусы</button>
    </form>
  </div>
</template>
