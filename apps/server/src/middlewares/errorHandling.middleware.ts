import jwt from 'jsonwebtoken';
import type { ErrorRequestHandler } from 'express';
import z, { ZodError } from 'zod';
import { ServerError, UnauthorizedError, ValidationError, ApiError } from '@/errors/index.js';

const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = jwt;

const errorHandlingMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json(new ValidationError(z.flattenError(err)));
  }

  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
    return res.status(401).json(new UnauthorizedError('Токен авторизации истёк.'));
  }

  if (err instanceof ApiError) {
    return res.status(err.code).json(err);
  }

  return res.status(500).json(new ServerError());
};

export default errorHandlingMiddleware;
