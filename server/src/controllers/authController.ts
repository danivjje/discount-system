import prisma from '@/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt-ts';
import { RequestHandler } from 'express';

export const authUser: RequestHandler = async (req, res) => {
  const { username, password }: { username: string; password: string } = req.body;

  const user: User | null = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error('Пользователя с этим именем пользователя не существует');
  }

  const isPasswordValid: boolean = compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Неверный пароль');
  }

  const token: string = jwt.sign({ username }, process.env.JWT_SECRET_KEY as string, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  res.cookie('authtoken', token, {
    httpOnly: true,
  });

  return res.json(token);
};

export const checkAuth: RequestHandler = async (req, res) => {
  const token = req.cookies['token'];
  if (!token) throw new Error('token is not valid');

  try {
    const verifiedToken: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    res.json(verifiedToken);
  } catch (err) {
    throw new Error('token is not valid');
  }
};
