import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { loginFormScheme } from '@packages/schemes';
import * as authService from '@/services/auth.service';
import { LoginResponse } from '@packages/types';
import { ApiError } from '@/errors/ApiError';
import { UnauthorizedError } from '@/errors';

const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = jwt;

export const authUser: RequestHandler = async (req, res, next) => {
  const sessionToken: string | undefined = req.cookies.authtoken;
  const refreshToken: string | undefined = req.cookies.refreshtoken;

  try {
    await authService.check(sessionToken, refreshToken);

    return next(new ApiError(403, 'forbidden', 'Вы уже авторизованы'));
  } catch (err) {
    if (
      err instanceof TokenExpiredError ||
      err instanceof JsonWebTokenError ||
      err instanceof NotBeforeError ||
      err instanceof UnauthorizedError
    ) {
      try {
        const data: { username: string; password: string } = req.body;
        const parsedData = loginFormScheme.parse(data);

        const { sessionToken, refreshToken }: LoginResponse = await authService.login(parsedData);

        res.cookie('authtoken', sessionToken, { httpOnly: true, secure: false });
        res.cookie('refreshtoken', refreshToken, { httpOnly: true, secure: false });

        return res.status(200).end();
      } catch (err) {
        return next(err);
      }
    }

    return next(err);
  }
};

export const checkAuth: RequestHandler = async (req, res, next) => {
  const sessionToken: string | undefined = req.cookies.authtoken;
  const refreshToken: string | undefined = req.cookies.refreshtoken;

  try {
    const response: Awaited<ReturnType<typeof authService.check>> = await authService.check(sessionToken, refreshToken);
    if ('token' in response) {
      res.cookie('authtoken', response.token, { httpOnly: true, secure: false });
      return res.status(200).json(response.payload);
    }

    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};
