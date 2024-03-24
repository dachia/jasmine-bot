import { ExtractAmountsFromPromptService } from '../extractAmountsFromPromptService.mjs'
import { ConvertToGramsService } from '../convertToGramsService.mjs';
import { chatGpt } from "../singletones.mjs"
import { mapFoodItemsToSpecificFoodArray } from '../../mappers/mapFoodItemsToSpecificFoodArray.mjs';

describe('ExtractFoodItemsFromPromptService', () => {
  let service
  let service2

  beforeEach(() => {
    service = new ExtractAmountsFromPromptService(chatGpt);
    service2 = new ConvertToGramsService(chatGpt);
  })
  describe('execute', () => {
    let result
    let result2
    // const prompt = '150g lean steak basted in tbsp butter with 4 stalks of medium sized asparagus'

    const prompt = `61g oatmeaal
    2 barhi dates
    230g low fat milk`

    const foods = [
      {
        generalTerm: "oatmeal",
        specificVariety: null,
        inputTerm: "61g oatmeaal",
        type: "general term",
        variations: [
          "rolled oats",
          "steel-cut oats",
          "instant oats",
        ],
      },
      {
        generalTerm: "dates",
        specificVariety: "barhi dates",
        inputTerm: "2 barhi dates",
        type: "specific variety",
        variations: [
          "medjool dates",
          "deglet noor dates",
          "zahidi dates",
        ],
      },
      {
        generalTerm: "low fat milk",
        specificVariety: null,
        inputTerm: "230g low fat milk",
        type: "general term",
        variations: [
          "skim milk",
          "1% milk",
          "2% milk",
        ],
      },
    ]
    // const prompt = 'lean steak basted in butter with few stalks of asparagus'
    // const foods = ['lean steak', 'Vbutter', 'asparagus']
    beforeEach(async () => {
      const allSpecificFoods = mapFoodItemsToSpecificFoodArray(foods)
      result = await service.execute({
        allSpecificFoods
      })
      result2 = await service2.execute({
        amounts: result
      })
    });
    it('should extract items', () => {
      expect(result2.length).to.eq(4);
    });
  });
});