// import { chatGpt } from "../../services/singletones.mjs"
import { client } from '../../utils/testDatabase.mjs';
import { ProfileRepo } from '../../repos/profileRepo.mjs';
import { EstimatedBurnPerDayService } from '../../services/estimateBurnPerDayService.mjs';
import { EstimateBurnPerDayUseCase } from '../estimeBurnPerDayUseCase.mjs';
import { ProfileModel } from "../../domain/profileModel.mjs";
const gptResponse = {
  id: "chatcmpl-8zjtdwg1Cag1fSsJGEOXzPMeySopV",
  object: "chat.completion",
  created: 1709725125,
  model: "gpt-4-0125-preview",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "{\n  \"estimatedBurnPerDay\": 3200\n}",
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 79,
    completion_tokens: 13,
    total_tokens: 92,
  },
  system_fingerprint: "fp_00ceb2df5b",
}
describe('EstimateBurnPerDay', () => {
  let estimatedBurnPerDayService
  let profileRepo
  let useCase

  beforeEach(() => {
    estimatedBurnPerDayService = new EstimatedBurnPerDayService({ processPrompt: () => gptResponse });
    profileRepo = new ProfileRepo(client);
    useCase = new EstimateBurnPerDayUseCase(estimatedBurnPerDayService, profileRepo);
  })
  describe('execute', () => {
    let result
    const userId = 'userId'
    const weight = 81
    const height = 179
    const birthDate = new Date('1986-11-29')
    const gender = 'male'
    // const activityLevel = '3 jiu jitsu sessions a week, 5 runs a week, walking'
    // const activityLevel = 'sedentary'
    const activityLevel = null
    // const steps = null
    const steps = 17000
    let profile

    beforeEach(async () => {
      profile = new ProfileModel({ userId, weight, height, birthDate, gender, activityLevel, steps });
      await profileRepo.save(profile);
      result = await useCase.execute({
        userId,
      });
    });
    it('should estimate kcal', () => {
      expect(result.estimatedBurnPerDay).to.eq(3200);
    });
    it('should update profile', async () => {
      const updatedProfile = await profileRepo.getByUserId(userId);
      expect(updatedProfile.estimatedBurnPerDay).to.eq(3200);
    })
  });
});