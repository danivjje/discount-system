import prisma from '@/client';
import jwt from 'jsonwebtoken';
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

  const token: string = jwt.sign({ username }, process.env.JWT_TOKEN as string, { algorithm: 'HS256' });
  return res.json(token);
};
