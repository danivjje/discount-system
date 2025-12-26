import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { compareSync, hashSync } from 'bcrypt-ts';
import { db } from '@packages/db/client';
import { verificationCodesTable } from '@packages/db';
import type { VerificationCode } from '@packages/shared';

export const create = async (phone: string): Promise<void> => {
  let code: string = String(crypto.randomInt(9999));

  if (code.length < 4) {
    code = '0'.repeat(4 - code.length) + code;
  }

  console.log(code); // remove

  const codeHash: string = hashSync(code, 10);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // template of request to sms service
  const response = await fetch(`${process.env.SMS_API_URL}/user/balance`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SMS_API_TOKEN}`,
    },
  });

  console.log(await response.json()); // remove

  await db.transaction(async (tx) => {
    await tx.delete(verificationCodesTable).where(eq(verificationCodesTable.phone, phone));
    await tx.insert(verificationCodesTable).values({
      phone,
      code: codeHash,
      expiresAt,
    });
  });
};

export const verify = async (phone: string, code: string): Promise<boolean> => {
  const result = await db.select().from(verificationCodesTable).where(eq(verificationCodesTable.phone, phone)).limit(1);
  const dbCode: VerificationCode = result[0];
  if (dbCode.expiresAt > new Date(Date.now())) {
    return compareSync(code, dbCode.code);
  }

  await db.delete(verificationCodesTable).where(eq(verificationCodesTable.phone, phone));
  return false;
};
