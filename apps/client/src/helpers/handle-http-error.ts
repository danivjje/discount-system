import { HTTPError } from 'ky';
import type { ToastsStore } from '@/store/toasts';

export const handleHttpError = async (err: unknown, toastsStore: ToastsStore) => {
  if (err instanceof HTTPError) {
    try {
      const response = await err.response.clone().json();
      toastsStore.showError(response.message);
    } catch (err) {
      toastsStore.showError('Не удалось обработать ошибку с сервера. Перезагрузите страницу или попробуйте позже.');
    }
  }
};
