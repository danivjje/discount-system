import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
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
];
