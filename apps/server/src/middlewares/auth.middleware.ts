import { UnauthorizedError } from '@/errors';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware: RequestHandler = async (req, _res, next) => {
  try {
    const token = req.cookies.authtoken;

    if (!token) {
      throw new UnauthorizedError('Для выполнения этого действия необходимо авторизоваться');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
