import { RequestHandler } from 'express';
import * as authService from '@/services/auth.service';

const authMiddleware: RequestHandler = async (req, res, next) => {
  const sessionToken: string | undefined = req.cookies.authtoken;
  const refreshToken: string | undefined = req.cookies.refreshtoken;

  try {
    const sessionPayload: Awaited<ReturnType<typeof authService.check>> = await authService.check(
      sessionToken,
      refreshToken,
    );

    if ('token' in sessionPayload) {
      res.cookie('authtoken', sessionPayload.token);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
