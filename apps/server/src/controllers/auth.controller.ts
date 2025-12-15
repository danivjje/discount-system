import { RequestHandler } from 'express';
import { loginFormScheme } from '@packages/schemes';
import * as authService from '@/services/auth.service';
import { LoginResponse } from '@packages/types';

export const authUser: RequestHandler = async (req, res, next) => {
  try {
    const data: { username: string; password: string } = req.body;
    const parsedData = loginFormScheme.parse(data);

    const { sessionToken, refreshToken }: LoginResponse = await authService.login(parsedData);

    res.cookie('authtoken', sessionToken, { httpOnly: true, secure: false });
    res.cookie('refreshtoken', refreshToken, { httpOnly: true, secure: false });

    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const sessionToken: string | undefined = req.cookies.authtoken;
    const refreshToken: string | undefined = req.cookies.refreshtoken;

    const response: Awaited<ReturnType<typeof authService.check>> = await authService.check(sessionToken, refreshToken);
    if (typeof response === 'object' && 'token' in response) {
      res.cookie('authtoken', response.token, { httpOnly: true, secure: false });
      return res.status(200).json(response.payload);
    }

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
