import { ChatGpt } from "./chatGpt.mjs";
import { MentalChat } from "./mentalChat.mjs";
import { NutritionInfoService } from "./nutritionInfoService.mjs";
import { EstimatedBurnPerDayService } from "./estimateBurnPerDayService.mjs";
import { TranslationService } from "./translations.mjs";
import { AuthService } from "./authService.mjs";
import config from "../config.mjs";
import { ExtractAmountsFromPromptService } from "./extractAmountsFromPromptService.mjs";
import { ExtractFoodItemsFromPromptService } from "./extractFoodItemsFromPromptService.mjs"
import { NutritionFactsGPTService } from "./nutritionFactsGPTService.mjs"
import { ConvertToGramsService } from "./convertToGramsService.mjs";

export const chatGpt = new ChatGpt({
  apiKey: config.OPENAI_API_KEY,
  organization: config.OPENAI_ORG_ID
});
export const mentalChat = new MentalChat(chatGpt);
export const nutritionInfoService = new NutritionInfoService(chatGpt);
export const estimatedBurnPerDayService = new EstimatedBurnPerDayService(chatGpt);
export const translationService = new TranslationService();
export const authService = new AuthService();
export const extractAmountsFromPromptService = new ExtractAmountsFromPromptService(chatGpt);
export const extractFoodItemsFromPromptService = new ExtractFoodItemsFromPromptService(chatGpt);
export const nutritionFactsGPTService = new NutritionFactsGPTService(chatGpt);
export const convertToGramsService = new ConvertToGramsService(chatGpt);