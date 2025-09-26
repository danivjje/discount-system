<script setup lang="ts">
import { useAuthStore } from '@/store';
import type { AuthUserForm } from '@/types';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const authUserFormData: AuthUserForm = reactive({
  username: '',
  password: '',
});

const handleSubmitLogin = async () => {
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
  <form @submit.prevent="handleSubmitLogin">
    <Input v-model="authUserFormData.username" type="text" placeholder="Имя пользователя" class="mb-2" />
    <Input v-model="authUserFormData.password" type="password" placeholder="Пароль" class="mb-2" />
    <Button type="submit">Войти</Button>
  </form>
</template>
