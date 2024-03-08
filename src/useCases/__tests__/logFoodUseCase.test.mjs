import { LogFoodUseCase } from '../logFoodUseCase.mjs'
import { NutritionInfoService } from '../../services/nutritionInfoService.mjs';
import { chatGpt } from "../../services/singletones.mjs"
import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { FoodLogRepo } from '../../repos/foodLogRepo.mjs';
import { client } from '../../utils/testDatabase.mjs';

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

describe('LogFoodUseCase', () => {
  let nutritionInfoService
  let chatSessionRepo
  let logFoodUseCase
  let foodLogRepo
  let idx = 0

  beforeEach(() => {
    // nutritionInfoService = new NutritionInfoService(chatGpt);
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
    logFoodUseCase = new LogFoodUseCase(nutritionInfoService, foodLogRepo, chatSessionRepo);
  })
  describe('execute', () => {
    let result
    const userId = 'userId'
    const date = new Date();
    // const prompt = '160g Steak lean, basted in butter, medium rare. Standard seasoning';
    const prompt = `61g oatmeaal
2 dates
230g low fat milk`
    // const prompt = 'Single mcdonalds cheeseburger, small fries and diet coke';
    // const prompt = 'Single mcdonalds cheeseburger and diet coke';
    // const prompt = 'small fries and diet coke';
    beforeEach(async () => {
      result = await logFoodUseCase.execute({
        userId,
        date,
        prompt
      });
    });
    it('should process message', () => {
      const html = result.toASCII();
      // console.log(html)
      expect(html).include('oatmeal');
    });
    it("should save log", async () => {
      const logs = await foodLogRepo.find();
      expect(logs.length).to.eq(1);
    })
    it("should save session", async () => {
      const session = await chatSessionRepo.find();
      expect(session.length).to.eq(1);
    })
  });
});