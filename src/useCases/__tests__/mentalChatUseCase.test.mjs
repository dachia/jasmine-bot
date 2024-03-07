import { MentalChatUseCase } from '../mentalChatUseCase.mjs'
import { MentalChat } from '../../services/mentalChat.mjs';
import { ChatSessionRepo } from '../../repos/chatSessionRepo.mjs';
import { client } from '../../utils/testDatabase.mjs';
// import { chatGpt } from '../../services/singletones.mjs';

const mockResponse = {
  id: "chatcmpl-90684WciR7twdQHgN2Tr55OEH1iet",
  object: "chat.completion",
  created: 1709810588,
  model: "gpt-4-0125-preview",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "{\"message\":\"It's completely normal to have cravings. Can you tell me more about when these cravings usually happen?\",\"actionableItems\":[],\"questions\":[\"Do these cravings occur at specific times or under specific circumstances?\",\"What types of food do you find yourself craving?\"],\"summary\":\"Artur is experiencing food cravings and we're exploring the context and specifics of these cravings to better understand and address them.\"}",
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 112,
    completion_tokens: 82,
    total_tokens: 194,
  },
  system_fingerprint: "fp_00ceb2df5b",
}

describe('MentalChatUseCase', () => {
  let mentalChat
  let chatSessionRepo
  let mentalChatUseCase
  beforeEach(() => {
    mentalChat = new MentalChat({
      processPrompt: () => mockResponse
    });
    // mentalChat = new MentalChat(chatGpt);
    chatSessionRepo = new ChatSessionRepo(client);
    mentalChatUseCase = new MentalChatUseCase(mentalChat, chatSessionRepo);
  })
  describe('processMessage', () => {
    let result
    const message = "I am craving food"
    const name = "Artur"
    beforeEach(async () => {
      result = await mentalChatUseCase.processMessage({
        sessionId: `sessionId`,
        userId: 'userId',
        message,
        state: 'state',
        name
      });
    });
    it('should process message', async () => {
      expect(result).to.contain('Questions:');
    });
    it(`should create session`, async () => {
      const session = await chatSessionRepo.getById('sessionId')
      expect(session.messages.length).to.eq(2);
    })
  });
});