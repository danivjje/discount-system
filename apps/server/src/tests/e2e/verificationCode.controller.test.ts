import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import jwt from 'jsonwebtoken';

describe('verification code controller', () => {
  const token = jwt.sign({ username: process.env.ADMIN_USERNAME }, process.env.JWT_SECRET_KEY, {
    expiresIn: '10m',
  });
  const phone = '380123456789';

  it('POST /api/code/send', async () => {
    const response = await request(app)
      .post('/api/code/send')
      .send({ phone })
      .set('Cookie', [`authtoken=${token}`]);
    expect(response.status).toBe(200);
  });

  it('POST /api/code/verify', async () => {
    const response = await request(app)
      .post('/api/code/verify')
      .send({ phone, code: '1234' })
      .set('Cookie', [`authtoken=${token}`]);
    expect(response.status).toBeOneOf([200, 401]);
  });
});
