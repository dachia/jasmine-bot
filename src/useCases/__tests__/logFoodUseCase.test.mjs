import { LogFoodUseCase } from '../logFoodUseCase.mjs'
import { NutritionInfoService } from '../../services/nutritionInfoService.mjs';
// import { chatGpt } from "../../services/singletones.mjs"
import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { FoodLogRepo } from '../../repos/foodLogRepo.mjs';
import { client } from '../../utils/testDatabase.mjs';
// const respMcdonalds = {
//   id: "chatcmpl-8zjDn5lVwfArGoAp0MLgaHdYdtnT8",
//   object: "chat.completion",
//   created: 1709722531,
//   model: "gpt-4-0125-preview",
//   choices: [
//     {
//       index: 0,
//       message: {
//         role: "assistant",
//         content: "{\n  \"protein\": 22,\n  \"fat\": 23,\n  \"carbs\": 58,\n  \"calories\": 530,\n  \"fiber\": 4,\n  \"sugar\": 7,\n  \"grams\": 333,\n  \"ingredients\": [\"beef patty\", \"cheese\", \"bun\", \"potatoes\", \"vegetable oil\", \"salt\", \"carbonated water\", \"artificial sweetener\"],\n  \"mealName\": \"Single McDonald's Cheeseburger, Small Fries and Diet Coke\"\n}",
//       },
//       logprobs: null,
//       finish_reason: "stop",
//     },
//   ],
//   usage: {
//     prompt_tokens: 101,
//     completion_tokens: 114,
//     total_tokens: 215,
//   },
//   system_fingerprint: "fp_70b2088885",
// }

describe('LogFoodUseCase', () => {
  let nutritionInfoService
  let chatSessionRepo
  let logFoodUseCase
  let foodLogRepo

  const respSteak = {
    id: "chatcmpl-8zjDByWN49qpzukCkPc4xC9tp9Yla",
    object: "chat.completion",
    created: 1709722493,
    model: "gpt-4-0125-preview",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "{\n  \"protein\": 46.4,\n  \"fat\": 20.8,\n  \"carbs\": 0,\n  \"calories\": 360,\n  \"fiber\": 0,\n  \"sugar\": 0,\n  \"grams\": 160,\n  \"ingredients\": [\n    \"Steak\",\n    \"Butter\",\n    \"Seasoning\"\n  ],\n  \"mealName\": \"Steak lean, basted in butter, medium rare\"\n}",
        },
        logprobs: null,
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 103,
      completion_tokens: 98,
      total_tokens: 201,
    },
    system_fingerprint: "fp_70b2088885",
  }
  beforeEach(() => {
    nutritionInfoService = new NutritionInfoService({
      processPrompt: () => respSteak
    });
    chatSessionRepo = new ChatSessionRepo(client);
    foodLogRepo = new FoodLogRepo(client);
    logFoodUseCase = new LogFoodUseCase(nutritionInfoService, foodLogRepo, chatSessionRepo);
  })
  describe('execute', () => {
    let result
    const userId = 'userId'
    const date = new Date();
    const prompt = '160g Steak lean, basted in butter, medium rare. Standard seasoning';

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
      expect(result.protein).to.eq(46.4);
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