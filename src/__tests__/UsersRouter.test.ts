import { UsersRouter } from '../router/UsersRouter';
import supertest from 'supertest';
import http from 'http';

const testUuid = '2510e409-cc4e-4704-843b-be1c58419bd1';

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: () => testUuid,
}));

const server = http.createServer(function (req, res) {
  UsersRouter.run(req, res);
});
const request = supertest(server);

describe('UsersRouter with UsersCollectionEntity', () => {
  const testUser = {
    username: 'John',
    age: 20,
    hobbies: [],
  };

  test('get all users', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test('create new user', async () => {
    const response = await request.post('/api/users').send(testUser);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({ ...testUser, id: testUuid });
  });

  test('get newly created user', async () => {
    const response = await request.get(`/api/users/${testUuid}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ ...testUser, id: testUuid });
  });
});
