import db from '@packages/db';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@packages/types';
import { compareSync, hashSync } from 'bcrypt-ts';
import { RequestHandler } from 'express';
import { NotFoundError, UnauthorizedError } from '@/errors';
import { loginFormScheme } from '@packages/schemes';
import { usersTable } from '@packages/db/schema';
import { eq } from 'drizzle-orm';

// dev request
export const registerUser: RequestHandler = async (req, res) => {
  const { username, password }: { username: string; password: string } = req.body;
  const result = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
  const existedUser: User = result[0];

  if (!existedUser) {
    const userId: { id: number }[] = await db
      .insert(usersTable)
      .values({ username, password: hashSync(password, 10) })
      .$returningId();
    return res.json({ ...userId[0], username });
  }

  return res.status(400);
};

export const authUser: RequestHandler = async (req, res, next) => {
  try {
    const data: { username: string; password: string } = req.body;
    const { username, password } = loginFormScheme.parse(data);

    const result = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
    const user: User | null = result[0] || null;
    if (!user) {
      throw new NotFoundError('Пользователя с этим именем пользователя не существует');
    }

    const isPasswordValid: boolean = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Неверный пароль');
    }

    const token: string = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET_KEY as string, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });
    res.cookie('authtoken', token, { httpOnly: true, secure: false });

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
