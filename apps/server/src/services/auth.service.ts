import db from '@packages/db';
import { eq } from 'drizzle-orm';
import { compareSync } from 'bcrypt-ts';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { usersTable } from '@packages/db/schema';
import { NotFoundError, UnauthorizedError } from '@/errors';
import { LoginForm, LoginResponse, User } from '@packages/types';
import * as refreshTokenService from '@/services/refreshToken.service';

export const login = async (data: LoginForm): Promise<LoginResponse> => {
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

  const sessionToken: string = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '30s',
  });

  const refreshToken: string = await refreshTokenService.create({ id: user.id, username });

  return {
    sessionToken,
    refreshToken,
  };
};

export const check = async (
  sessionToken: string | undefined,
  refreshToken: string | undefined,
): Promise<(JwtPayload | string) | { token: string; payload: JwtPayload | string }> => {
  if (!sessionToken && !refreshToken) {
    throw new UnauthorizedError('Токен авторизации истёк.');
  }

  try {
    const sessionPayload: JwtPayload | string = jwt.verify(sessionToken as string, process.env.JWT_SECRET_KEY);
    console.log('session payload');
    console.log(sessionPayload);
    return sessionPayload;
  } catch (err) {
    const newSessionToken: string = await refreshTokenService.refreshToken(refreshToken);
    const newSessionPayload: JwtPayload | string = jwt.verify(newSessionToken, process.env.JWT_SECRET_KEY);

    return { token: newSessionToken, payload: newSessionPayload };
  }
};
