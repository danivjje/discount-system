<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { userScheme } from '@packages/schemes';
import CheckPhoneForm from '@/components/CheckPhoneForm.vue';
import EnrollBonusesForm from '@/components/EnrollBonusesForm.vue';
import { onMounted } from 'vue';

onMounted(() => {
  console.log(userScheme.parse({ id: 1, username: 'username' }));
});
</script>

<template>
  <div class="page flex flex-col items-center">
    <ul class="mb-[100px] flex">
      <li class="mr-4">
        <RouterLink to="/customers">Список покупателей</RouterLink>
      </li>
      <li>
        <RouterLink to="/settings">Настройки</RouterLink>
      </li>
    </ul>
    <CheckPhoneForm />
    <EnrollBonusesForm />
  </div>
</template>
