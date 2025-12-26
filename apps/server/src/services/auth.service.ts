import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '@packages/db/client';
import { usersTable } from '@packages/db';
import { compareSync } from 'bcrypt-ts';
import type { JwtCustomPayload } from '@/types/index.js';
import { NotFoundError, UnauthorizedError } from '@/errors/index.js';
import type { LoginForm, LoginResponse, User } from '@packages/shared';
import * as refreshTokenService from '@/services/refreshToken.service.js';

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
    expiresIn: '10m',
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
): Promise<JwtCustomPayload | { token: string; payload: JwtCustomPayload }> => {
  if (!sessionToken && !refreshToken) {
    throw new UnauthorizedError('Вы не авторизованы.');
  }

  try {
    const sessionPayload = jwt.verify(sessionToken as string, process.env.JWT_SECRET_KEY) as JwtCustomPayload;
    return sessionPayload;
  } catch (err) {
    const newSessionToken: string = await refreshTokenService.refreshToken(refreshToken);
    const newSessionPayload = jwt.verify(newSessionToken, process.env.JWT_SECRET_KEY) as JwtCustomPayload;

    return { token: newSessionToken, payload: newSessionPayload };
  }
};
