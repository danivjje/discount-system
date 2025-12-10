import { useAuthStore } from '@/store';
import { createRouter, createWebHistory, type Router } from 'vue-router';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'bonuses',
      path: '/',
      meta: {
        requiresAuth: true,
        nav: {
          showInNav: true,
          navTitle: 'Бонусы',
        },
      },
      component: () => import('@/views/BonusesPage.vue'),
    },
    {
      name: 'customers',
      path: '/customers',
      meta: {
        requiresAuth: true,
        nav: {
          showInNav: true,
          navTitle: 'Список клиентов',
        },
      },
      component: () => import('@/views/CustomersPage.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      meta: {
        requiresAuth: true,
        nav: {
          showInNav: true,
          navTitle: 'Настройки',
        },
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

  if (!authStore.isChecked) {
    authStore.isChecked = true;
    await authStore.checkAuth();
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
