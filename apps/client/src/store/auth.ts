import { authCheckUser, authLoginUser } from '@/api';
import type { AuthUserForm, User } from '@/types';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authUser: Ref<User | null> = ref(null);

  const authenticateUser = async (data: AuthUserForm): Promise<void> => {
    try {
      const user: User = await authLoginUser(data);
      authUser.value = user;
    } catch (err) {
      console.log(err);
    }
  };

  const checkAuth = async (): Promise<void> => {
    try {
      const user: User = await authCheckUser();
      authUser.value = user;
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
