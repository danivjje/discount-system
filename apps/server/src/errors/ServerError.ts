import { ApiError } from './ApiError';

export class ServerError extends ApiError {
  constructor() {
    super(500, 'server', 'Произошла ошибка, попробуйте перезагрузить страницу или попробуйте позже.');
  }
}
