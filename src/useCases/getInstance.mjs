import { mentalChat, nutritionInfoService, estimatedBurnPerDayService } from "../services/singletones.mjs"
import { ChatSessionRepo } from "../repos/chatSessionRepo.mjs"
import { MentalChatUseCase } from "./mentalChatUseCase.mjs"
import { ProfileRepo } from "../repos/profileRepo.mjs";
import { UpdateProfileUseCase } from "./updateProfileUseCase.mjs";
import { FoodLogRepo } from "../repos/foodLogRepo.mjs";
import { LogFoodUseCase } from "./logFoodUseCase.mjs";
import { EstimateBurnPerDayUseCase } from "./estimeBurnPerDayUseCase.mjs";
import { DeleteLogUseCase} from "./deleteLogUseCase.mjs";

export function getDeleteLogUseCaseInstance(client) {
  const foodLogRepo = new FoodLogRepo(client);
  return new DeleteLogUseCase(foodLogRepo);
}

export function getMentalChatUseCaseInstance(client) {
  const chatSessionRepo = new ChatSessionRepo(client);
  return new MentalChatUseCase(mentalChat, chatSessionRepo);
}

export function getUpdateProfileUseCaseInstance(client) {
  const profileRepo = new ProfileRepo(client);
  return new UpdateProfileUseCase(profileRepo);
}

export function getLogFoodUseCaseInstance(client) {
  const chatSessionRepo = new ChatSessionRepo(client);
  const foodLogRepo = new FoodLogRepo(client);
  return new LogFoodUseCase(nutritionInfoService, foodLogRepo, chatSessionRepo);
}

export function getEstimatedBurnPerDayInstance(client) {
  const chatSessionRepo = new ChatSessionRepo(client);
  const profileRepo = new ProfileRepo(client);
  return new EstimateBurnPerDayUseCase(estimatedBurnPerDayService, profileRepo, chatSessionRepo);
}