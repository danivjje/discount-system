<script setup lang="ts">
import { useAuthStore } from '@/store';
import type { LoginForm } from '@packages/types';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { InputText, Button } from 'primevue';

const router = useRouter();
const authStore = useAuthStore();

const authUserFormData: LoginForm = reactive({
  username: '',
  password: '',
});

const handleSubmitLogin = async () => {
  console.log(authUserFormData.username, authUserFormData.password);
  if ((authUserFormData.username.trim(), authUserFormData.password.trim())) {
    try {
      authStore.authenticateUser({ username: authUserFormData.username, password: authUserFormData.password });
      authUserFormData.username = '';
      authUserFormData.password = '';
      await router.push({ name: 'home' });
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmitLogin" class="flex flex-col justify-center items-center">
    <InputText v-model="authUserFormData.username" type="text" placeholder="Имя пользователя" class="mb-2" />
    <InputText v-model="authUserFormData.password" type="password" placeholder="Пароль" class="mb-2" />
    <Button type="submit">Войти</Button>
  </form>
</template>
