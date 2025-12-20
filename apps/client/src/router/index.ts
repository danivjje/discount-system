import { routes } from './routes';
import { useAuthStore } from '@/store';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isChecked) {
    try {
      await authStore.checkAuth();
    } catch (err) {
      console.log(err);
    } finally {
      authStore.isChecked = true;
    }
  }

  if (to.meta.requiresAuth && !authStore.authUser) {
    return next({ name: 'auth' });
  }

  if (to.name === 'auth' && authStore.authUser) {
    return next({ name: 'bonuses' });
  }

  next();
});

export default router;
