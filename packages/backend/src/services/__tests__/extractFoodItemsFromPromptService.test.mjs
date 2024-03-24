import { ExtractFoodItemsFromPromptService } from '../extractFoodItemsFromPromptService.mjs'
import { chatGpt } from "../singletones.mjs"

describe('ExtractFoodItemsFromPromptService', () => {
  let extractFoodItemsFromPromptService

  beforeEach(() => {
    extractFoodItemsFromPromptService = new ExtractFoodItemsFromPromptService(chatGpt);
  })
  describe('execute', () => {
    let result
    // const prompt = 'lean steak basted in butter with few stalks of asparagus'

    const prompt = `61g oatmeaal
    2 barhi dates
    230g low fat milk`
    beforeEach(async () => {
      result = await extractFoodItemsFromPromptService.execute({ 
        prompt
      })
    });
    it('should extract items', () => {
      expect(result).include('butter');
    });
  });
});