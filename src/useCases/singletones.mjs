import { MentalChatUseCase } from "./mentalChatUseCase.mjs";
import { mentalChat } from "../services/singletones.mjs";
import { chatRepo } from "../repos/singletones.mjs";

export const mentalChatUseCase = new MentalChatUseCase(mentalChat, chatRepo);