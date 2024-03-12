import { ChatSessionModel } from "../domain/chatSessionModel.mjs";
import { translationService } from "../services/singletones.mjs";
export class MentalChatUseCase {
  constructor(mentalChat, chatRepo) {
    this.mentalChat = mentalChat;
    this.chatRepo = chatRepo;
  }
  async processMessage({ userId, message, state, name, sessionId, ctx }) {
    const trans = translationService.getTranslationsInstance(ctx)
    const message_ = state === "first-message" ? `I am feeling: ${message}` : message
    let session = await this.chatRepo.getById(sessionId);
    if (session === null) {
      session = new ChatSessionModel({ id: sessionId, userId, problemStatement: message }, { isNew: true });
    }
    session.addMessage({ content: message_, role: 'user' });
    // const history = await this.chatRepo.getSessionMessages(userId);
    const response = await this.mentalChat.getTherapy({ state, name, session });
    const responseActionableItems = response.actionableItems?.length ? `\n${trans.t("general.actions")}:\n${response.actionableItems.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n` : null
    const responseQuestions = response.questions?.length ? `\n${trans.t("general.questions")}:\n${response.questions.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n` : null

    const responseTxt = [response.message, responseActionableItems, responseQuestions].filter(i => i != null).join('\n')
    session.addMessage({ content: responseTxt, role: 'assistant', rawResponse: response });
    await this.chatRepo.save(session);
    return responseTxt
  }
}