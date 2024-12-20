import supertest from 'supertest';
import { client } from '../../utils/testDatabase.mjs';
import { buildExpressApp } from '../../express.mjs';

describe('SignupUseCase', () => {
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
      result = await supertest(app).post('/api/sign-up').send({ password, email });
    });
    it('should create user', () => {
      expect(result.status).to.eq(200);
      // expect(result.userId).to.eq(userId);
      // expect(result.weight).to.eq(weight);
    });
  });
});