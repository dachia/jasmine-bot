import supertest from 'supertest';
import { client } from '../../utils/testDatabase.mjs';
import { buildExpressApp } from '../../express.mjs';
import { getAddTelegramAccountUseCaseInstance } from '../getInstance.mjs';
import { UserRepo } from '../../repos/userRepo.mjs';

describe('AddTelegramAccountUseCase', () => {
  let app;
  beforeEach(() => {
    app = buildExpressApp(client);
  })
  describe('execute', () => {
    let result
    let userRepo
    const password = 'password'
    const email = 'email@email.com'
    // const userId = 'userId'
    beforeEach(async () => {
      userRepo = new UserRepo(client)
      const addTelegramAccountUseCase = getAddTelegramAccountUseCaseInstance(client)
      const res = await supertest(app).post('/api/sign-up').send({ password, email });
      const user = res.body.user.data
      await addTelegramAccountUseCase.execute({ userId: user.id, accountId: 'accountId' });
      result = await userRepo.getById(user.id);
    });
    it('should add telegram account', () => {
      expect(result.accounts.length).to.eq(1);
      // expect(result.userId).to.eq(userId);
      // expect(result.weight).to.eq(weight);
    });
  });
});