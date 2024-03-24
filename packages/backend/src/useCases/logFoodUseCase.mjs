import { FoodLogModel } from "../domain/foodLogModel.mjs";
import { ChatSessionModel } from "../domain/chatSessionModel.mjs";

export class LogFoodUseCase {
  constructor(extractAmountsFromPromptService, extractFoodItemsFromPromptService, nutritionFactsGPTService, foodLogRepo) {
    this.extractAmountsFromPromptService = extractAmountsFromPromptService
    this.extractFoodItemsFromPromptService = extractFoodItemsFromPromptService
    this.nutritionFactsGPTService = nutritionFactsGPTService
    this.foodLogRepo = foodLogRepo;
  }
  async execute({ userId, prompt, date }) {
    const foods = await this.extractFoodItemsFromPromptService.execute({ prompt });
    const [amounts, facts] = await Promise.all([
      this.extractAmountsFromPromptService.execute({ prompt, foods }),
      this.nutritionFactsGPTService.execute({ foods })
    ]);

    if (!foods || !amounts || !facts) {
      return null;
    }
    const foodChoices = foods.map((food) => {
      return {
        food,
        amounts: amounts.filter((amount) => amount.food === food).map((amount) => amount.amounts).flat(),
        facts: facts.filter((fact) => fact.input === food).map((fact) => fact.foodDataFactsMatches).flat()
      }
    });
    const foodLog = new FoodLogModel({
      userId,
      prompt,
      date,
      foodChoices
    });
    await this.foodLogRepo.save(foodLog);
    return foodLog
  }
}