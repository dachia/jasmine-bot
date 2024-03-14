import supertest from 'supertest';
import { client } from '../../utils/testDatabase.mjs';
import { buildExpressApp } from '../../express.mjs';

describe('UserQuery', () => {
  let app;
  beforeEach(() => {
    app = buildExpressApp(client);
  })
  describe('execute', () => {
    let result
    const password = 'password'
    const email = 'email@email.com'
    // const userId = 'userId'
    beforeEach(async () => {
      await supertest(app).post('/api/signup').send({ password, email });
      const tokenRes = await supertest(app).post('/api/login').send({ password, email });
      result = await supertest(app).get('/api/current-user').set('Authorization', `Bearer ${tokenRes.body.token}`);
    });
    it('should login user', () => {
      expect(result.status).to.eq(200);
      // expect(result.userId).to.eq(userId);
      // expect(result.weight).to.eq(weight);
    });
  });
});