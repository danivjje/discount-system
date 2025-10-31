import { RequestHandler } from 'express';
import { loginFormScheme } from '@packages/schemes';
import * as authService from '@/services/auth.service';

export const authUser: RequestHandler = async (req, res, next) => {
  try {
    const data: { username: string; password: string } = req.body;
    const parsedData = loginFormScheme.parse(data);

    const token: string = await authService.login(parsedData);

    res.cookie('authtoken', token, { httpOnly: true, secure: false });

    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const token: string | undefined = req.cookies.authtoken;

    const verifiedToken = authService.check(token);

    return res.status(200).json(verifiedToken);
  } catch (err) {
    next(err);
  }
};
