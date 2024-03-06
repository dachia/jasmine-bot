import { mentalChat } from "../services/singletones.mjs"
import { ChatSessionRepo } from "../repos/chatSessionRepo.mjs"
import { MentalChatUseCase } from "./mentalChatUseCase.mjs"
import { ProfileRepo } from "../repos/profileRepo.mjs";
import { UpdateProfileUseCase } from "./updateProfileUseCase.mjs";

export function getMentalChatUseCaseInstance(client) {
  const chatSessionRepo = new ChatSessionRepo(client);
  return new MentalChatUseCase(mentalChat, chatSessionRepo);
}

export function getUpdateProfileUseCaseInstance(client) {
  const profileRepo = new ProfileRepo(client);
  return new UpdateProfileUseCase(profileRepo);
}