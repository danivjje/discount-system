import { createRouter, createWebHistory, type Router } from 'vue-router';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      name: 'customers',
      path: '/customers',
      component: () => import('@/views/CustomersPage.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('@/views/SettingsPage.vue'),
    },
    {
      name: 'auth',
      path: '/auth',
      component: () => import('@/views/AdminAuthorizationPage.vue'),
    },
  ],
});

export default router;
