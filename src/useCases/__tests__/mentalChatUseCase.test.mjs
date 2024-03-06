import { MentalChatUseCase } from '../mentalChatUseCase.mjs'
import { MentalChat } from '../../services/mentalChat.mjs';
import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { client } from '../../utils/testDatabase.mjs';

describe('MentalChatUseCase', () => {
  let mentalChat
  let chatSessionRepo
  let mentalChatUseCase
  beforeEach(() => {
    mentalChat = new MentalChat({
      createChatCompletion: () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                  message: "",
                  actionableItems: [],
                  questions: [],
                  summary: ""
              })
            }
          }
        ]
      }
      )
    });
    chatSessionRepo = new ChatSessionRepo(client);
    mentalChatUseCase = new MentalChatUseCase(mentalChat, chatSessionRepo);
  })
  describe('processMessage', () => {
    let result
    beforeEach(async () => {
      result = await mentalChatUseCase.processMessage({
        sessionId: `sessionId`,
        userId: 'userId',
        message: 'message',
        state: 'state',
        name: 'name'
      });
    });
    it('should process message', async () => {
      expect(result).to.contain('You need to do the following:');
    });
    it(`should create session`, async () => {
      const session = await chatSessionRepo.getById('sessionId')
      expect(session.messages.length).to.eq(2);
    })
  });
});