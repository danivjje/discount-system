<script setup lang="ts">
import { RouterLink } from 'vue-router';
import CheckPhoneForm from '@/components/CheckPhoneForm.vue';
import EnrollBonusesForm from '@/components/EnrollBonusesForm.vue';
</script>

<template>
  <div class="page flex flex-col items-center">
    <ul class="mb-[100px] flex">
      <li class="mr-4">
        <RouterLink to="/customers" class="text-gray-800 text-lg font-medium">Список клиентов</RouterLink>
      </li>
      <li>
        <RouterLink to="/settings" class="text-gray-800 text-lg font-medium">Настройки</RouterLink>
      </li>
    </ul>
    <CheckPhoneForm />
    <EnrollBonusesForm />
  </div>
</template>
