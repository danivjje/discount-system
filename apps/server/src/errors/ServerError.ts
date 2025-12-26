import { ApiError } from './ApiError.js';

export class ServerError extends ApiError {
  constructor() {
    super(500, 'server', 'Произошла ошибка, попробуйте перезагрузить страницу или попробуйте позже.');
  }
}
