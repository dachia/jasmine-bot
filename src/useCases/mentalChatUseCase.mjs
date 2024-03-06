import { ChatSessionModel } from "../domain/chatSessionModel.mjs";
export class MentalChatUseCase {
  constructor(mentalChat, chatRepo) {
    this.mentalChat = mentalChat;
    this.chatRepo = chatRepo;
  }
  async processMessage({ userId, message, state, name, sessionId }) {
    const message_ = state === "first-message" ? `I am feeling: ${message}` : message
    let session = await this.chatRepo.getById(sessionId);
    if (session === null) {
      session = new ChatSessionModel({ id: sessionId, userId, problemStatement: message }, { isNew: true });
    }
    session.addMessage({ content: message_, role: 'user' });
    // const history = await this.chatRepo.getSessionMessages(userId);
    const response = await this.mentalChat.getTherapy({ state, name, session });
    const responseTxt = `${response.message}

You need to do the following:
${response.actionableItems.map((item, index) => `${index + 1}. ${item}`).join("\n")}

To dig deeper, I have the following questions:
${response.questions.map((item, index) => `${index + 1}. ${item}`).join("\n")}
`
    session.addMessage({ content: responseTxt, role: 'assistant', rawResponse: response });
    await this.chatRepo.save(session);
    return responseTxt
  }
}