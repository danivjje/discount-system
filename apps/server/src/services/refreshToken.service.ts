import { UnauthorizedError } from '@/errors';
import db from '@packages/db';
import { refreshTokensTable, usersTable } from '@packages/db/schema';
import { RefreshToken, SafeUser, User } from '@packages/types';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export const create = async (data: SafeUser): Promise<string> => {
  const { id, username } = data;

  const token: string = jwt.sign({ id, username }, process.env.JWT_REFRESH_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '30d',
  });

  const userResult = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
  const user: User = userResult[0];

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await db.insert(refreshTokensTable).values({
    token,
    userId: user.id,
    expiresAt,
  });

  return token;
};

export const refreshToken = async (token: string | undefined): Promise<string> => {
  if (!token) throw new UnauthorizedError('Токен авторизации истёк');

  const result = await db.select().from(refreshTokensTable).where(eq(refreshTokensTable.token, token)).limit(1);
  const tokenItem: RefreshToken | null = result[0] || null;

  if (tokenItem) {
    try {
      const refreshPayload = jwt.verify(tokenItem.token, process.env.JWT_REFRESH_SECRET_KEY);
      console.log('refresh payload');
      console.log(refreshPayload);
      if (typeof refreshPayload === 'object' && 'username' in refreshPayload) {
        return jwt.sign({ id: refreshPayload.id, username: refreshPayload.username }, process.env.JWT_SECRET_KEY, {
          algorithm: 'HS256',
          expiresIn: '30s',
        });
      }
    } catch (err) {
      await db.update(refreshTokensTable).set({ revoked: true }).where(eq(refreshTokensTable.token, token)).limit(1);
      throw err;
    }
  }

  throw new UnauthorizedError('Токен авторизации истёк');
};
