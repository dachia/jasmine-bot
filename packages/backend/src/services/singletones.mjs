import { ChatGpt } from "./chatGpt.mjs";
import { MentalChat } from "./mentalChat.mjs";
import { NutritionInfoService } from "./nutritionInfoService.mjs";
import { EstimatedBurnPerDayService } from "./estimateBurnPerDayService.mjs";
import { TranslationService } from "./translations.mjs";
import config from "../config.mjs";

export const chatGpt = new ChatGpt({
  apiKey: config.OPENAI_API_KEY,
  organization: config.OPENAI_ORG_ID
});
export const mentalChat = new MentalChat(chatGpt);
export const nutritionInfoService = new NutritionInfoService(chatGpt);
export const estimatedBurnPerDayService = new EstimatedBurnPerDayService(chatGpt);
export const translationService = new TranslationService();