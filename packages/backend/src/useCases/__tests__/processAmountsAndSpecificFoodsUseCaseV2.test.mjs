import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { FoodLogRepo } from '../../repos/foodLogRepo.mjs';
import { client } from '../../utils/testDatabase.mjs';
import { mapNutritionFactsCollectionToAsciiTable } from '../../mappers/mapNutritionFactsCollectionToAsciiTable.mjs';
import { convertToGramsService, parseFreeTextPromptService, translationService, nutritionFactsGPTService  } from '../../services/singletones.mjs';
import { mapFoodLogToConfirmResponse } from '../../mappers/mapFoodLogToConfirmResponse.mjs';
import { ProcessAmountsAndSpecificFoodsUseCaseV2 } from '../processAmountsAndSpecificFoodsUseCaseV2.mjs';
import { GetNutritionFactsUseCase } from '../getNutritionFactsUseCase.mjs';

describe('ProcessAmountsAndSpecificFoodsUseCaseV2', () => {
  let chatSessionRepo
  let processAmountsAndSpecificFoodsUseCase
  let foodLogRepo
  let nutritionFactsUseCase

  beforeEach(() => {
    chatSessionRepo = new ChatSessionRepo(client);
    foodLogRepo = new FoodLogRepo(client);
    processAmountsAndSpecificFoodsUseCase = new ProcessAmountsAndSpecificFoodsUseCaseV2(parseFreeTextPromptService, convertToGramsService, foodLogRepo, chatSessionRepo);
    nutritionFactsUseCase = new GetNutritionFactsUseCase(nutritionFactsGPTService, foodLogRepo);
  })

  const prompts = [
    // '2 cups of gignger tea with honey',
    // '160g Steak lean, basted in butter, medium rare. Standard seasoning',
    // '61g oatmeal\n2 dates\n230g low fat milk',
    // 'Single mcdonalds cheeseburger, small fries and diet coke',
    // 'Single burger king cheeseburger, small fries and diet coke',
    // // 'lean steak basted in butter, milka max one square'.
    // 'lean steak basted in butter, milka max one small square'
    // `8 squares of milka max`,
// 'A bit of fried lean beef with onion, a bit of cauliflower and some nut',




    `150g karak chaiV
Half roti
100g chicken curry
50g chicken biryani
100g fruit chaat
100g dahi hulking
50g dry fruits
2 samosas`
  ];
  prompts.forEach((prompt) => {
    describe(`execute with ${prompt}`, () => {
      let result
      let result2
      const userId = 'userId'
      const date = new Date();

      beforeEach(async () => {
        result = await processAmountsAndSpecificFoodsUseCase.execute({
          userId,
          date,
          prompt
        });
        result2 = await nutritionFactsUseCase.execute({
          userId,
          foodLogId: result.id
        });
      });
      it('should process message', () => {
        const message = mapFoodLogToConfirmResponse(result, translationService.en);
        console.log(message)
        expect(message).to.not.be.undefined;

        const table = mapNutritionFactsCollectionToAsciiTable(result2.perItemNutritionFacts, translationService.en);
        console.log(table.toString())
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