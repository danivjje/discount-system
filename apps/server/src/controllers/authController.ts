import { prisma } from '@packages/database/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@packages/types';
import { compareSync, hashSync } from 'bcrypt-ts';
import { RequestHandler } from 'express';
import { NotFoundError, UnauthorizedError } from '@/errors';
import { loginFormScheme } from '@packages/schemes';

// dev request
export const registerUser: RequestHandler = async (req, res) => {
  const { username, password }: { username: string; password: string } = req.body;
  const existedUser = await prisma.user.findUnique({ where: { username } });

  if (!existedUser) {
    const user = await prisma.user.create({
      data: { username, password: hashSync(password, 10) },
    });
    return res.json(user);
  }

  return res.status(400);
};

export const authUser: RequestHandler = async (req, res, next) => {
  try {
    const data: { username: string; password: string } = req.body;
    const { username, password } = loginFormScheme.parse(data);

    const user: User | null = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new NotFoundError('Пользователя с этим именем пользователя не существует');
    }

    const isPasswordValid: boolean = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Неверный пароль');
    }

    const token: string = jwt.sign({ username }, process.env.JWT_SECRET_KEY as string, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });
    res.cookie('authtoken', token, { httpOnly: true });

    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.authtoken;
    if (!token) {
      throw new UnauthorizedError('Вы не авторизованы');
    }

    const verifiedToken: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    return res.status(200).json(verifiedToken);
  } catch (err) {
    next(err);
  }
};
