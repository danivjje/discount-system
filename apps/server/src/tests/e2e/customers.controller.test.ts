import { describe, expect, it } from 'vitest';
import { app } from '@/app.js';
import request from 'supertest';
import jwt from 'jsonwebtoken';

describe('customers controller', () => {
  let phone: string = '';
  const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });

  it('GET /api/customers', async () => {
    const response = await request(app)
      .get('/api/customers')
      .set('Cookie', [`authtoken=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('customers');
  });

  it('GET /api/customers (401 error)', async () => {
    const response = await request(app).get('/api/customers');
    expect(response.statusCode).toBe(401);
  });

  it('POST /api/customers', async () => {
    const response = await request(app)
      .post('/api/customers')
      .set('Cookie', [`authtoken=${token}`])
      .set('Content-Type', 'application/json')
      .send({ phone: '380999999999', sum: 500 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('phone');
    phone = response.body.phone;
  });

  it('POST /api/customers (400 error)', async () => {
    const response = await request(app)
      .post('/api/customers')
      .set('Cookie', [`authtoken=${token}`])
      .set('Content-Type', 'application/json')
      .send({ phone: '123' });
    expect(response.statusCode).toBe(400);
  });

  it(`GET /api/customers/${phone}`, async () => {
    const response = await request(app)
      .get(`/api/customers/${phone}`)
      .set('Cookie', [`authtoken=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('phone', phone);
  });

  it('GET /api/customers/123456789123 (404 error)', async () => {
    const response = await request(app)
      .get('/api/customers/123456789123')
      .set('Cookie', [`authtoken=${token}`]);
    expect(response.statusCode).toBe(404);
  });

  it(`PATCH /api/customers/${phone}/reset-bonuses`, async () => {
    const response = await request(app)
      .patch(`/api/customers/${phone}/reset-bonuses`)
      .set('Cookie', [`authtoken=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('phone');
  });
});
