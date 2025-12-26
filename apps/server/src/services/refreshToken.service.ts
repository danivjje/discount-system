import jwt from 'jsonwebtoken';
import { and, eq } from 'drizzle-orm';
import { UnauthorizedError } from '@/errors/index.js';
import type { JwtCustomPayload } from '@/types/index.js';
import { db } from '@packages/db/client';
import { refreshTokensTable, usersTable } from '@packages/db';
import type { RefreshToken, SafeUser, User } from '@packages/shared';

export const create = async (data: SafeUser): Promise<string> => {
  const { id, username } = data;

  const token: string = jwt.sign({ id, username }, process.env.JWT_REFRESH_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '30d',
  });

  const userResult = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
  const user: User = userResult[0];

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days to ms with utc+0

  await db.transaction(async (tx) => {
    await tx
      .update(refreshTokensTable)
      .set({ revoked: true })
      .where(and(eq(refreshTokensTable.userId, user.id), eq(refreshTokensTable.revoked, false)));
    await tx.insert(refreshTokensTable).values({ token, userId: user.id, expiresAt });
  });

  return token;
};

export const refreshToken = async (token: string | undefined): Promise<string> => {
  if (!token) throw new UnauthorizedError('Вы не авторизованы.');

  const result = await db.select().from(refreshTokensTable).where(eq(refreshTokensTable.token, token)).limit(1);
  const tokenItem: RefreshToken | null = result[0] || null;

  if (tokenItem && !tokenItem.revoked) {
    try {
      const refreshPayload = jwt.verify(tokenItem.token, process.env.JWT_REFRESH_SECRET_KEY) as JwtCustomPayload;

      return jwt.sign({ id: refreshPayload.id, username: refreshPayload.username }, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '10m',
      });
    } catch (err) {
      await db.update(refreshTokensTable).set({ revoked: true }).where(eq(refreshTokensTable.token, token));
      throw err;
    }
  }

  throw new UnauthorizedError('Токен авторизации истёк.');
};
