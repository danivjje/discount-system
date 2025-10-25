import { authCheckUser, authLoginUser } from '@/api';
import type { LoginForm, SafeUser } from '@packages/types';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authUser: Ref<SafeUser | null> = ref(null);

  const authenticateUser = async (data: LoginForm): Promise<void> => {
    try {
      await authLoginUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkAuth = async (): Promise<void> => {
    try {
      const user: SafeUser | void = await authCheckUser();
      if (user) authUser.value = user;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    authUser,
    authenticateUser,
    checkAuth,
  };
});
