export class MentalChatUseCase {
  constructor(mentalChat, chatRepo) {
    this.mentalChat = mentalChat;
    this.chatRepo = chatRepo;
  }
  async processMessage({ userId, message, state, name }) {
    const message_ = state === "first-message" ? `I am feeling: ${message}` : message
    const history = await this.chatRepo.getUserMessages(userId);
    const response = await this.mentalChat.getTherapy({ message: message_, state, name, history });
    const responseTxt = `${response.message}

You need to do the following:
${response.actionableItems.map((item, index) => `${index + 1}. ${item}`).join("\n")}

To dig deeper, I have the following questions:
${response.questions.map((item, index) => `${index + 1}. ${item}`).join("\n")}
`
    await this.chatRepo.add({ userId, content: message_, role: 'user' });
    await this.chatRepo.add({ userId, content: responseTxt, role: 'assistant', rawResponse: response});
    return responseTxt
  }
}