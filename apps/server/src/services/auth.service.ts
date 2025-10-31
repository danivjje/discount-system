import { NotFoundError, UnauthorizedError } from '@/errors';
import db from '@packages/db';
import { usersTable } from '@packages/db/schema';
import { LoginForm, User } from '@packages/types';
import { compareSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const login = async (data: LoginForm): Promise<string> => {
  const { username, password } = data;

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

  return token;
};

export const check = (token: string | undefined): JwtPayload | string => {
  if (!token) {
    throw new UnauthorizedError('Вы не авторизованы');
  }

  const verifiedToken: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  return verifiedToken;
};
