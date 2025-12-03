import jwt from 'jsonwebtoken';
import type { ErrorRequestHandler } from 'express';
import z, { ZodError } from 'zod';
import { NotFoundError, ServerError, UnauthorizedError, ValidationError } from '@/errors';

const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = jwt;

const errorHandlingMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  console.log(err);
  if (err instanceof ZodError) {
    return res.status(400).json(new ValidationError(z.flattenError(err)));
  }

  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
    return res.status(401).json(new UnauthorizedError('Токен авторизации истёк.'));
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json(err);
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json(err);
  }

  return res.status(500).json(new ServerError());
};

export default errorHandlingMiddleware;
