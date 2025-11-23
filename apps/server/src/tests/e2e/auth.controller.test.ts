import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import jwt from 'jsonwebtoken';

describe('auth controller', () => {
  it('POST /api/auth/login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: process.env.ADMIN_USERNAME as string,
        password: process.env.ADMIN_PASSWORD as string,
      });
    expect(response.statusCode).toBe(200);
  });

  it('POST /api/auth/login (incorrect password)', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: process.env.ADMIN_USERNAME as string,
        password: '943223',
      });
    expect(response.statusCode).toBe(401);
  });

  it('POST /api/auth/login (incorrect username)', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'sdkfjsdf0sfd0g',
      password: 'asddjfgoidfg',
    });
    expect(response.statusCode).toBe(404);
  });

  it('GET /api/auth/check', async () => {
    const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET_KEY as string, { expiresIn: '10m' });
    const response = await request(app)
      .get('/api/auth/check')
      .set('Cookie', [`authtoken=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('username');
  });
});
