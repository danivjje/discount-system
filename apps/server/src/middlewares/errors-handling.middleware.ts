import jwt from 'jsonwebtoken';
import type { ErrorRequestHandler } from 'express';
import z, { ZodError } from 'zod';
import { NotFoundError, ServerError, UnauthorizedError, ValidationError } from '@/errors';

const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = jwt;

const errorsHandlingMiddleware: ErrorRequestHandler = async (err, req, res, next) => {
  console.log(err);
  if (err instanceof ZodError) {
    const errors = z.flattenError(err);
    return res.status(400).json(new ValidationError(z.flattenError(err)));
  }

  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
    console.log('jwt');
    return res.status(401).json(new UnauthorizedError('Для выполнения этого действия необходима авторизация.'));
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json(err);
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json(err);
  }

  return res.status(500).json(new ServerError());
};

export default errorsHandlingMiddleware;
