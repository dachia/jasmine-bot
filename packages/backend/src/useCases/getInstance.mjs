import { mentalChat, nutritionInfoService, estimatedBurnPerDayService, convertToGramsService, extractMealInputFromPromptService } from "../services/singletones.mjs"
import { ChatSessionRepo } from "../repos/chatSessionRepo.mjs"
import { MentalChatUseCase } from "./mentalChatUseCase.mjs"
import { ProfileRepo } from "../repos/profileRepo.mjs";
import { UpdateProfileUseCase } from "./updateProfileUseCase.mjs";
import { FoodLogRepo } from "../repos/foodLogRepo.mjs";
import { ProcessAmountsAndSpecificFoodsUseCase } from "./processAmountsAndSpecificFoodsUseCase.mjs";
import { EstimateBurnPerDayUseCase } from "./estimeBurnPerDayUseCase.mjs";
import { DeleteLogUseCase} from "./deleteLogUseCase.mjs";
import { ProfileStatsLogRepo } from "../repos/profileStatsLogRepo.mjs";
import { SignupUseCase } from "./signupUseCase.mjs";
import { UserRepo } from "../repos/userRepo.mjs";
import { LoginUseCase } from "./loginUseCase.mjs";
import { authService } from "../services/singletones.mjs";
import { AddTelegramAccountUseCase } from "./addTelegramAccountUseCase.mjs";
import { extractAmountsFromPromptService, extractFoodItemsFromPromptService, nutritionFactsGPTService } from "../services/singletones.mjs"
import { GetNutritionFactsUseCase } from "./getNutritionFactsUseCase.mjs";
import { UpdateUserUseCase } from "./updateUserUseCase.mjs";

export function getUpdateUserUseCaseInstance(client) {
  const userRepo = new UserRepo(client);
  return new UpdateUserUseCase(userRepo);
}

export function getAddTelegramAccountUseCaseInstance(client) {
  const userRepo = new UserRepo(client);
  return new AddTelegramAccountUseCase(userRepo);
}

export function getLoginUseCase(client) {
  const userRepo = new UserRepo(client);
  return new LoginUseCase(userRepo, authService);
}

export function getSignupUseCase(client) {
  const userRepo = new UserRepo(client);
  return new SignupUseCase(userRepo);
}
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
  const profileStatsLogRepo = new ProfileStatsLogRepo(client);
  return new UpdateProfileUseCase(profileRepo, profileStatsLogRepo);
}


export function getGetNutritionFactsUseCaseInstance(client) {
  const foodLogRepo = new FoodLogRepo(client);
  return new GetNutritionFactsUseCase(nutritionFactsGPTService, foodLogRepo);
}
export function getProcessAmountsAndSpecificFoodsUseCaseInstance(client) {
  const chatSessionRepo = new ChatSessionRepo(client);
  const foodLogRepo = new FoodLogRepo(client);
  return new ProcessAmountsAndSpecificFoodsUseCase(extractAmountsFromPromptService, extractFoodItemsFromPromptService, convertToGramsService, foodLogRepo, chatSessionRepo);
}

export function getEstimatedBurnPerDayInstance(client) {
  const chatSessionRepo = new ChatSessionRepo(client);
  const profileRepo = new ProfileRepo(client);
  return new EstimateBurnPerDayUseCase(estimatedBurnPerDayService, profileRepo, chatSessionRepo);
}

export function getProcessAmountsAndSpecificFoodsUseCaseV2(client) {
  const chatSessionRepo = new ChatSessionRepo(client);
  const foodLogRepo = new FoodLogRepo(client);
  return new ProcessAmountsAndSpecificFoodsUseCaseV2(extractMealInputFromPromptService, foodLogRepo, chatSessionRepo);
}