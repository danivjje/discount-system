import { ApiError } from './ApiError.js';

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, 'notFound', message);
  }
}
