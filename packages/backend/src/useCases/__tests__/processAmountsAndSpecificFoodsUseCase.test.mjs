import { ProcessAmountsAndSpecificFoodsUseCase } from '../processAmountsAndSpecificFoodsUseCase.mjs'
import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { FoodLogRepo } from '../../repos/foodLogRepo.mjs';
import { client } from '../../utils/testDatabase.mjs';
import { mapNutritionFactsCollectionToAsciiTable } from '../../mappers/mapNutritionFactsCollectionToAsciiTable.mjs';
import { convertToGramsService, translationService } from '../../services/singletones.mjs';
import { extractAmountsFromPromptService, extractFoodItemsFromPromptService, nutritionFactsGPTService } from "../../services/singletones.mjs"
import { mapFoodLogToConfirmResponse } from '../../mappers/mapFoodLogToConfirmResponse.mjs';

describe('ProcessAmountsAndSpecificFoodsUseCase', () => {
  let nutritionInfoService
  let chatSessionRepo
  let processAmountsAndSpecificFoodsUseCase
  let foodLogRepo
  let idx = 0

  beforeEach(() => {
    chatSessionRepo = new ChatSessionRepo(client);
    foodLogRepo = new FoodLogRepo(client);
    processAmountsAndSpecificFoodsUseCase = new ProcessAmountsAndSpecificFoodsUseCase(extractAmountsFromPromptService, extractFoodItemsFromPromptService, convertToGramsService, foodLogRepo, chatSessionRepo);
  })

  const prompts = [
    '160g Steak lean, basted in butter, medium rare. Standard seasoning',
    '61g oatmeal\n2 dates\n230g low fat milk',
    'Single mcdonalds cheeseburger, small fries and diet coke',
    'lean steak basted in butter, milka max one square'
  ];
  prompts.forEach((prompt) => {
    describe(`execute with ${prompt}`, () => {
      let result
      const userId = 'userId'
      const date = new Date();

      beforeEach(async () => {
        result = await processAmountsAndSpecificFoodsUseCase.execute({
          userId,
          date,
          prompt
        });
      });
      it('should process message', () => {
        const message = mapFoodLogToConfirmResponse(result, translationService.en);
        console.log(message)
        expect(message).to.not.be.undefined;
      });
      it.skip("should save log", async () => {
        const logs = await foodLogRepo.find();
        expect(logs.length).to.eq(1);
      })
      // it("should save session", async () => {
      //   const session = await chatSessionRepo.find();
      //   expect(session.length).to.eq(1);
      // })
    });
  })
});