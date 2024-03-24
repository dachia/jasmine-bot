import { LogFoodUseCase } from '../logFoodUseCase.mjs'
import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { FoodLogRepo } from '../../repos/foodLogRepo.mjs';
import { client } from '../../utils/testDatabase.mjs';
import { mapNutritionFactsCollectionToAsciiTable } from '../../mappers/mapNutritionFactsCollectionToAsciiTable.mjs';
import { convertToGramsService, translationService } from '../../services/singletones.mjs';
import { extractAmountsFromPromptService, extractFoodItemsFromPromptService, nutritionFactsGPTService } from "../../services/singletones.mjs"

describe('LogFoodUseCase', () => {
  let nutritionInfoService
  let chatSessionRepo
  let logFoodUseCase
  let foodLogRepo
  let idx = 0

  beforeEach(() => {
    chatSessionRepo = new ChatSessionRepo(client);
    foodLogRepo = new FoodLogRepo(client);
    logFoodUseCase = new LogFoodUseCase(extractAmountsFromPromptService, extractFoodItemsFromPromptService, nutritionFactsGPTService, convertToGramsService, foodLogRepo, chatSessionRepo);
  })
  describe('execute', () => {
    let result
    const userId = 'userId'
    const date = new Date();
    // const prompt = '160g Steak lean, basted in butter, medium rare. Standard seasoning';
    //     const prompt = `61g oatmeaal
    // 2 dates
    // 230g low fat milk`
    // const prompt = 'Single mcdonalds cheeseburger, small fries and diet coke';
    // const prompt = 'Single mcdonalds cheeseburger and diet coke';
    // const prompt = 'small fries and diet coke';
    // const prompt = 'lean steak basted in butter'
    const prompt = 'lean steak basted in butter, milka max one square'
    beforeEach(async () => {
      result = await logFoodUseCase.execute({
        userId,
        date,
        prompt
      });
    });
    it('should process message', () => {
      const colletion = result.perItemNutritionFacts;
      const table = mapNutritionFactsCollectionToAsciiTable(colletion, translationService.en);
      const text = table.toString()
      console.log(text)
      expect(text).include('Oats');
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
});