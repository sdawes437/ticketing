import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on succesful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with an invalid email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'bademail',
      password: 'password',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test.com',
      password: 'p',
    })
    .expect(400);
});

it('returns a 400 with a missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test.com',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after succesful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
