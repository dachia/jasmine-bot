import { ProcessAmountsAndSpecificFoodsUseCase } from '../../useCases/processAmountsAndSpecificFoodsUseCase.mjs'
import { NutritionInfoService } from '../../services/nutritionInfoService.mjs';
import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { FoodLogRepo } from '../../repos/foodLogRepo.mjs';
import { client } from '../../utils/testDatabase.mjs';
import { DailyReportQuery } from '../dailyReportQuery.mjs';
import { mapNutritionFactsCollectionToAsciiTable } from '../../mappers/mapNutritionFactsCollectionToAsciiTable.mjs';
import { translationService } from '../../services/singletones.mjs';
import { ProfileRepo } from '../../repos/profileRepo.mjs';

const respNutritionFacts = {
  id: "chatcmpl-90V6A92o8VILBmScCqeoBakpr6NXz",
  object: "chat.completion",
  created: 1709906570,
  model: "gpt-3.5-turbo-0125",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "{\"results\":[{\"protein\":16.9,\"fat\":6.9,\"carbohydrates\":66.3,\"kcal\":389,\"fiber\":10.6,\"sugar\":0,\"grams\":100,\"input\":\"oatmeal\",\"itemName\":\"\"},{\"protein\":2.5,\"fat\":0.4,\"carbohydrates\":63.4,\"kcal\":282,\"fiber\":6.7,\"sugar\":59.2,\"grams\":100,\"input\":\"dates\",\"itemName\":\"\"},{\"protein\":3.4,\"fat\":1.5,\"carbohydrates\":4.8,\"kcal\":42,\"fiber\":0,\"sugar\":5,\"grams\":100,\"input\":\"low fat milk\",\"itemName\":\"\"}]}",
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 88,
    completion_tokens: 149,
    total_tokens: 237,
  },
  system_fingerprint: "fp_4f0b692a78",
}

const respPortionSize = {
  id: "chatcmpl-90V68RYXSU14wq3AKJk9kcd7zmUuK",
  object: "chat.completion",
  created: 1709906568,
  model: "gpt-3.5-turbo-0125",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "{\"results\":[{\"name\":\"oatmeal\",\"userPortionSizeInput\":\"61g\",\"estimatedPortionSizeUnits\":\"grams\",\"estimatedPortionSizeInGrams\":61},{\"name\":\"dates\",\"userPortionSizeInput\":\"2\",\"estimatedPortionSizeUnits\":\"pieces\",\"estimatedPortionSizeInGrams\":48},{\"name\":\"low fat milk\",\"userPortionSizeInput\":\"230g\",\"estimatedPortionSizeUnits\":\"grams\",\"estimatedPortionSizeInGrams\":230}]}",
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 110,
    completion_tokens: 100,
    total_tokens: 210,
  },
  system_fingerprint: "fp_2b778c6b35",
}

describe('DailyReportQuery', () => {
  let nutritionInfoService
  let chatSessionRepo
  let logFoodUseCase
  let profileRepo
  let foodLogRepo
  let idx = 0
  const userId = 'userId'
  const date = new Date();
  // const prompt = '160g Steak lean, basted in butter, medium rare. Standard seasoning';
  const prompt = `61g oatmeaal
2 dates
230g low fat milk`

  beforeEach(async () => {
    nutritionInfoService = new NutritionInfoService({
      idx: 0,
      processPrompt: () => {
        const possibleResp = [respPortionSize, respNutritionFacts]
        const curIdx = idx % 2
        idx++
        return possibleResp[curIdx]
      }
    });
    chatSessionRepo = new ChatSessionRepo(client);
    foodLogRepo = new FoodLogRepo(client);
    logFoodUseCase = new ProcessAmountsAndSpecificFoodsUseCase(nutritionInfoService, foodLogRepo, chatSessionRepo);
    profileRepo = new ProfileRepo(client);
    date.setHours(0, 0, 0, 0);
    await logFoodUseCase.execute({
      userId,
      date,
      prompt
    });
    await logFoodUseCase.execute({
      userId,
      date,
      prompt
    });
  })
  describe('execute', () => {
    let result
    beforeEach(async () => {
      const query = new DailyReportQuery(foodLogRepo, profileRepo);
      result = await query.execute({
        userId,
        date,
        prompt
      });
    });
    it('should process message', () => {
      const colletion = result.logs.asNutritionFactsCollection();
      const table = mapNutritionFactsCollectionToAsciiTable(colletion, translationService.en);
      const text = table.toString()
      console.log(text)
      expect(text).include('oatmeal');
    });
  });
});