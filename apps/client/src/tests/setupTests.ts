import { config } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { ToastService } from 'primevue';
import router from '@/router';

setActivePinia(createPinia());
config.global.plugins = [PrimeVue, ToastService, router];
