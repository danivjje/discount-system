import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import './styles/index.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.mount('#app');
