import { MentalChatUseCase } from '../mentalChatUseCase.mjs'
import { MentalChat } from '../../services/mentalChat.mjs';
import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { expect } from 'chai';
import { connectToDb, disconnectFromDb } from '../../db.mjs';
import config from '../../config.mjs';

describe('MentalChatUseCase', () => {
  let mentalChat
  let chatSessionRepo
  let mentalChatUseCase
  let client
  before(async () => {
    client = await connectToDb(config.MONGODB_URI_TEST);
  })
  after(async () => {
    await disconnectFromDb(client);
  })
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
  // afterEach(async () => {
  //   await chatSessionRepo.collection.deleteMany({});
  // });
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
      const session = await chatSessionRepo.getSession('sessionId')
      expect(session.messages.length).to.eq(2);
    })
  });
});