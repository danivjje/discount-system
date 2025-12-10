import db from '@packages/db';
import { verificationCodesTable } from '@packages/db/schema';
import crypto from 'crypto';
import { compareSync, hashSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import { VerificationCode } from '@packages/types';

export const create = async (phone: string): Promise<void> => {
  const expiresAt: Date = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 5);
  const code: string = String(crypto.randomInt(9999));
  console.log(code);
  const codeHash: string = hashSync(code, 10);

  await db.delete(verificationCodesTable).where(eq(verificationCodesTable.phone, phone));
  await db.insert(verificationCodesTable).values({
    phone,
    code: codeHash,
    expiresAt,
  });
};

export const verify = async (phone: string, code: string): Promise<boolean> => {
  const result = await db.select().from(verificationCodesTable).where(eq(verificationCodesTable.phone, phone)).limit(1);
  const dbCode: VerificationCode = result[0];
  if (dbCode.expiresAt > new Date()) {
    return compareSync(code, dbCode.code);
  }

  await db.delete(verificationCodesTable).where(eq(verificationCodesTable.phone, phone));
  return false;
};
