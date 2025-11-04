import { RequestHandler } from 'express';
import { loginFormScheme } from '@packages/schemes';
import * as authService from '@/services/auth.service';
import * as refreshTokenService from '@/services/refreshToken.service';
import { LoginResponse } from '@packages/types';
import jwt from 'jsonwebtoken';

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

    try {
      const verifiedToken = authService.check(sessionToken);
      return res.status(200).json(verifiedToken);
    } catch (err) {
      const refreshToken: string | undefined = req.cookies.refreshtoken;
      const newSessionToken: string = await refreshTokenService.refreshToken(refreshToken);
      const verifiedToken = jwt.verify(newSessionToken, process.env.JWT_SECRET_KEY as string);

      res.cookie('authtoken', newSessionToken, { httpOnly: true, secure: false });
      return res.status(200).json(verifiedToken);
    }
  } catch (err) {
    next(err);
  }
};
