import { ApiErrorType } from '@packages/types';

export class ApiError extends Error {
  code: number;
  type: ApiErrorType;
  message: string;

  constructor(code: number, type: ApiErrorType, message: string) {
    super(message);
    this.code = code;
    this.type = type;
    this.message = message;
  }
}
