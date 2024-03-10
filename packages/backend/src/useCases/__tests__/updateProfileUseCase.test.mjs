import { getUpdateProfileUseCaseInstance } from '../getInstance.mjs';
import { client } from '../../utils/testDatabase.mjs';

describe('UpdateProfileUseCase', () => {
  let updateProfileUseCase
  beforeEach(() => {
    updateProfileUseCase = getUpdateProfileUseCaseInstance(client);
  })
  describe('execute', () => {
    let result
    const userId = 'userId'
    const weight = 100
    beforeEach(async () => {
      result = await updateProfileUseCase.execute({
        userId,
        weight
      });
    });
    it('should create new profile', () => {
      expect(result.userId).to.eq(userId);
      expect(result.weight).to.eq(weight);
    });

    describe('when profile exists', () => {
      const birthDate = new Date();
      beforeEach(async () => {
        result = await updateProfileUseCase.execute({
          userId: 'userId',
          birthDate,
        })
      })

      it('should update profile', () => {
        expect(result.userId).to.eq(userId);
        expect(result.weight).to.eq(weight);
        expect(result.birthDate).to.be.instanceOf(Date);
      })
    })
  });
});