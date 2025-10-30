<script setup lang="ts">
import z, { ZodError } from 'zod';
import { useAuthStore, useToastsStore } from '@/store';
import { useRouter } from 'vue-router';
import type { LoginForm } from '@packages/types';
import { reactive, ref, type Ref } from 'vue';
import { loginFormScheme } from '@packages/schemes';
import type { $ZodFlattenedError } from 'zod/v4/core';

import { InputText, Button } from 'primevue';
import InputErrors from '@/components/InputErrors.vue';

const router = useRouter();
const authStore = useAuthStore();
const toastsStore = useToastsStore();

const inputErrors: Ref<$ZodFlattenedError<LoginForm> | null> = ref(null);
const authUserFormData: LoginForm = reactive({
  username: '',
  password: '',
});

const handleSubmitLogin = async () => {
  try {
    inputErrors.value = null;
    const data = loginFormScheme.parse(authUserFormData);

    await authStore.authenticateUser(data);
    authUserFormData.username = '';
    authUserFormData.password = '';

    toastsStore.showSuccessToast('Вы успешно авторизовались');
    router.push({ name: 'home' });
  } catch (err) {
    if (err instanceof ZodError) {
      inputErrors.value = z.flattenError(err);
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmitLogin" class="flex flex-col justify-center items-center">
    <div class="mb-3">
      <InputText
        v-model="authUserFormData.username"
        type="text"
        placeholder="Имя пользователя"
        class="w-full"
        :invalid="!!inputErrors?.fieldErrors?.username?.length"
      />
      <InputErrors :errors="inputErrors?.fieldErrors.username" />
    </div>
    <div class="mb-3">
      <InputText
        v-model="authUserFormData.password"
        type="password"
        placeholder="Пароль"
        class="w-full"
        :invalid="!!inputErrors?.fieldErrors?.password?.length"
      />
      <InputErrors :errors="inputErrors?.fieldErrors.password" />
    </div>
    <Button type="submit">Войти</Button>
  </form>
</template>
