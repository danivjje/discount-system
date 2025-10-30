import { handleHttpError } from '@/helpers/handle-http-error';
import { useAuthStore, useToastsStore } from '@/store';
import { createRouter, createWebHistory, type Router } from 'vue-router';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/views/HomePage.vue'),
    },
    {
      name: 'customers',
      path: '/customers',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/views/CustomersPage.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/views/SettingsPage.vue'),
    },
    {
      name: 'auth',
      path: '/auth',
      meta: {
        requiresAuth: false,
      },
      component: () => import('@/views/AdminAuthorizationPage.vue'),
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  const toastsStore = useToastsStore();

  if (!authStore.authUser) {
    try {
      await authStore.checkAuth();
    } catch (err) {
      await handleHttpError(err, toastsStore, false);
    }
  }

  if (to.meta.requiresAuth && !authStore.authUser) {
    return next({ name: 'auth' });
  }

  if (to.name === 'auth' && authStore.authUser) {
    return next({ name: 'home' });
  }

  next();
});

export default router;
