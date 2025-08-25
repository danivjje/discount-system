import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: import('@/views/HomePage.vue'),
    },
    {
      name: 'customers',
      path: '/customers',
      component: import('@/views/CustomersPage.vue'),
    },
  ],
});

export default router;
