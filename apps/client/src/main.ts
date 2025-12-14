import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Lara from '@primeuix/themes/lara';
import './styles/index.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
  },
});
app.use(ToastService);
app.mount('#app');
