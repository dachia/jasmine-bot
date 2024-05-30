import { ExtractMealInputFromPromptService } from '../extractMealInputFromPromptService.mjs';
import { chatGpt } from "../singletones.mjs"

describe('ExtractMealInputFromPormptService', () => {
  let service

  beforeEach(() => {
    service = new ExtractMealInputFromPromptService(chatGpt);
  })
  describe('execute', () => {
    let result

    const prompt = `61g oatmeaal
    2 barhi dates
    230g low fat milk`

    // const prompt = 'lean steak basted in butter with few stalks of asparagus'
    // const foods = ['lean steak', 'Vbutter', 'asparagus']
    beforeEach(async () => {
      result = await service.execute({
        prompt
      })
    });
    it('should extract items', () => {
      expect(result.length).to.eq(4);
    });
  });
});