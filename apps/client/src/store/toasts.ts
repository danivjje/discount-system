import { defineStore } from 'pinia';
import { useToast } from 'primevue';

const TOAST_LIFE_MS: number = 3000;

export const useToastsStore = defineStore('toasts', () => {
  const toast = useToast();

  const showError = (message: string): void => {
    toast.add({
      severity: 'error',
      summary: message,
      life: TOAST_LIFE_MS,
    });
  };

  const showSuccessToast = (message: string): void => {
    toast.add({
      severity: 'success',
      summary: message,
      life: TOAST_LIFE_MS,
    });
  };

  return { showError, showSuccessToast };
});

export type ToastsStore = ReturnType<typeof useToastsStore>;
