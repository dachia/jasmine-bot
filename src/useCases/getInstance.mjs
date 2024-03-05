import { mentalChat } from "../services/singletones.mjs"
import { ChatSessionRepo } from "../repos/chatSessionRepo.mjs"
import { MentalChatUseCase } from "./mentalChatUseCase.mjs"

export function getMentalChatUseCaseInstance(client) {
  const chatSessionRepo = new ChatSessionRepo(client);
  return new MentalChatUseCase(mentalChat, chatSessionRepo);
}