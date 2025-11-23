import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import jwt from 'jsonwebtoken';
import { AppConfig } from '@packages/types';

describe('app config controller', () => {
  it('GET, POST /api/config', async () => {
    const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET_KEY as string);

    const getResponse = await request(app)
      .get('/api/config')
      .set('Cookie', [`authtoken=${token}`]);
    expect(getResponse.statusCode).toBe(200);
    expect(Array.isArray(getResponse.body)).toBe(true);
    const appConfig: AppConfig[] = getResponse.body;

    const postResponse = await request(app)
      .post('/api/config')
      .send(appConfig)
      .set('Cookie', [`authtoken=${token}`]);
    expect(postResponse.statusCode).toBe(200);
  });
});
