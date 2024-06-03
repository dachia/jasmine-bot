import { ParseFreeTextPromptService } from '../parseFreeTextPromptService.mjs'
import { chatGpt } from "../singletones.mjs"

describe('ParseFreeTextPromptService', () => {
  let service

  beforeEach(() => {
    service = new ParseFreeTextPromptService(chatGpt);
  })
  describe('execute', () => {
    let result
    // const prompt = 'lean steak basted in butter with few stalks of asparagus'

    const prompt = `61grams oatmeaal
    2 barhi dates
    230g low fat milk`
    beforeEach(async () => {
      result = await service.execute({ 
        prompt
      })
    });
    it('should extract items', () => {
      expect(result).include('butter');
    });
  });
});