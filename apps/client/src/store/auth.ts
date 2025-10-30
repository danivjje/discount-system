import { authCheckUser, authLoginUser } from '@/api';
import type { LoginForm, SafeUser } from '@packages/types';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';
import { useToastsStore } from './toasts';
import { handleHttpError } from '@/helpers/handle-http-error';

export const useAuthStore = defineStore('auth', () => {
  const authUser: Ref<SafeUser | null> = ref(null);
  const toastsStore = useToastsStore();

  const authenticateUser = async (data: LoginForm): Promise<void> => {
    try {
      await authLoginUser(data);
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  };

  const checkAuth = async (): Promise<void> => {
    try {
      const user: SafeUser | void = await authCheckUser();
      if (user) authUser.value = user;
    } catch (err) {
      await handleHttpError(err, toastsStore);
    }
  };

  return {
    authUser,
    authenticateUser,
    checkAuth,
  };
});
