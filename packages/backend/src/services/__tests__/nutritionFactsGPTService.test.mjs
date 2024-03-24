import { NutritionFactsGPTService } from '../nutritionFactsGPTService.mjs'
import { chatGpt } from "../singletones.mjs"

describe('NutritionFactsGPTService', () => {
  let service

  beforeEach(() => {
    service = new NutritionFactsGPTService(chatGpt);
  })
  describe('execute', () => {
    let result
    // const foods = ['lean steak', 'butter', 'asparagus']
    // const foods = ['milka max']
    const foods = ['oatmeal', 'dates', 'low fat milk']

    beforeEach(async () => {
      result = await service.execute({ 
        foods
      })
    });
    it('should extract items', () => {
        expect(result[0].possibleAmounts.length).to.eq(3);
    });
    /**
     * {
  input: "milka max",
  foodDataFactsMatches: [
    {
      protein: 5.1,
      fat: 33.6,
      carbohydrates: 56.4,
      kcal: 548,
      fiber: 0,
      sugar: 54.3,
      grams: 100,
      name: "Milka Max Chocolate Bar",
    },
  ],
}
     */
  });
});