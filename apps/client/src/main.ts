import { createApp } from 'vue';
import './styles/index.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

const app = createApp(App);
app.component('Input', Input);
app.component('Button', Button);
app.use(createPinia());
app.use(router);
app.mount('#app');
