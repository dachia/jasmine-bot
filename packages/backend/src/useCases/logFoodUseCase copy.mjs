import { FoodLogModel } from "../domain/foodLogModel.mjs";
import { ChatSessionModel } from "../domain/chatSessionModel.mjs";
import { mapFoodItemsToSpecificFoodArray } from "../mappers/mapFoodItemsToSpecificFoodArray.mjs";

export class LogFoodUseCase {
  constructor(extractAmountsFromPromptService, extractFoodItemsFromPromptService, nutritionFactsGPTService, convertToGramsService, foodLogRepo) {
    this.extractAmountsFromPromptService = extractAmountsFromPromptService
    this.extractFoodItemsFromPromptService = extractFoodItemsFromPromptService
    this.nutritionFactsGPTService = nutritionFactsGPTService
    this.convertToGramsService = convertToGramsService
    this.foodLogRepo = foodLogRepo;
  }
  async execute({ userId, prompt, date }) {
    const foods = await this.extractFoodItemsFromPromptService.execute({ prompt });
    const allSpecificFoods = mapFoodItemsToSpecificFoodArray(foods)
    const [amounts, facts] = await Promise.all([
      this.extractAmountsFromPromptService.execute({ prompt, allSpecificFoods }),
      this.nutritionFactsGPTService.execute({ allSpecificFoods })
    ]);
    const grams = await this.convertToGramsService.execute({ amounts });

    if (!foods || !amounts || !facts) {
      return null;
    }
    const foodChoices = foods.map((food) => {
      const amountsPerFood = amounts.filter((amount) => food.variations.includes(amount.food)).map((amount) => {
        const conversions = grams.find((g) => g.food === amount.food);
        const grams_ = conversions ? conversions.grams * amount.quantity : amount.quantity;
        return {
          name: amount.food,
          grams: grams_,
        }
      });
      const factsPerFood = facts.filter((fact) => food.variations.includes(fact.input)).map((fact) => fact.foodDataFactsMatches).flat();
      return {
        food: food.inputFood,
        amounts: amountsPerFood,
        facts: factsPerFood
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