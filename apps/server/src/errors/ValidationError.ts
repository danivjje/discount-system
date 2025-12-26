import { ApiError } from './ApiError.js';

export class ValidationError<T = unknown> extends ApiError {
  details: T;
  constructor(details: T) {
    super(400, 'validation', 'Ошибка валидации.');
    this.details = details;
  }
}
