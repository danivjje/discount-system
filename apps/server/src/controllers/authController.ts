import prisma from '@packages/database/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt-ts';
import { RequestHandler } from 'express';

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

  return res.status(200).end();
};

export const checkAuth: RequestHandler = async (req, res) => {
  const token = req.cookies.authtoken;
  if (!token) res.json({ message: 'token is not valid' });

  try {
    const verifiedToken: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    return res.json(verifiedToken);
  } catch (err) {
    throw new Error('token is not valid');
  }
};
