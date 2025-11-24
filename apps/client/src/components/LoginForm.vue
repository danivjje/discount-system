<script setup lang="ts">
import z, { ZodError } from 'zod';
import { useAuthStore, useToastsStore } from '@/store';
import { useRouter } from 'vue-router';
import type { LoginForm } from '@packages/types';
import { reactive, ref, type Ref } from 'vue';
import { loginFormScheme } from '@packages/schemes';
import type { $ZodFlattenedError } from 'zod/v4/core';

import { InputText, Button, IftaLabel } from 'primevue';
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

    authStore.isChecked = false;
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
      <IftaLabel>
        <InputText
          data-test="auth-username"
          id="auth-username"
          v-model="authUserFormData.username"
          type="text"
          placeholder="username"
          class="w-full"
          :invalid="!!inputErrors?.fieldErrors?.username?.length"
        />
        <label for="auth-username">Имя пользователя</label>
      </IftaLabel>
      <InputErrors :errors="inputErrors?.fieldErrors.username" />
    </div>
    <div class="mb-3">
      <IftaLabel>
        <InputText
          data-test="auth-password"
          id="auth-password"
          v-model="authUserFormData.password"
          type="password"
          placeholder="Пароль"
          class="w-full"
          :invalid="!!inputErrors?.fieldErrors?.password?.length"
        />
        <label for="auth-password">Пароль</label>
      </IftaLabel>
      <InputErrors :errors="inputErrors?.fieldErrors.password" />
    </div>
    <Button data-test="auth-submit" type="submit">Войти</Button>
  </form>
</template>
