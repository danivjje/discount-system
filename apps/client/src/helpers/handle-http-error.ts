import { HTTPError } from 'ky';
import type { ToastsStore } from '@/store/toasts';

export const handleHttpError = async (err: unknown, toastsStore: ToastsStore, throwErr: boolean = true) => {
  if (err instanceof HTTPError) {
    try {
      const response = await err.response.clone().json();
      console.log('show message');
      toastsStore.showError(response.message);
    } catch (err) {
      toastsStore.showError('Не удалось обработать ошибку с сервера');
    }
  }
  if (throwErr) throw err;
};
