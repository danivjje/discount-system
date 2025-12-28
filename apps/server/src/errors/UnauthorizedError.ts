import { ApiError } from './ApiError';

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(401, 'unauthorized', message);
  }
}
