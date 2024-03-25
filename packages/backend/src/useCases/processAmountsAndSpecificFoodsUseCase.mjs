import { FoodLogModel } from "../domain/foodLogModel.mjs";
import { mapFoodItemsToSpecificFoodArray } from "../mappers/mapFoodItemsToSpecificFoodArray.mjs";

export class ProcessAmountsAndSpecificFoodsUseCase {
  constructor(extractAmountsFromPromptService, extractFoodItemsFromPromptService, convertToGramsService, foodLogRepo) {
    this.extractAmountsFromPromptService = extractAmountsFromPromptService
    this.extractFoodItemsFromPromptService = extractFoodItemsFromPromptService
    this.convertToGramsService = convertToGramsService
    this.foodLogRepo = foodLogRepo;
  }
  async execute({ userId, prompt, date }) {
    const foods = await this.extractFoodItemsFromPromptService.execute({ prompt });
    const allSpecificFoods = mapFoodItemsToSpecificFoodArray(foods)
    const amounts = await this.extractAmountsFromPromptService.execute({ prompt, allSpecificFoods })
    const grams = await this.convertToGramsService.execute({ amounts });

    if (!foods || !amounts) {
      return null;
    }
    const foodChoices = foods.map((food) => {
      const amountsPerFood = amounts.filter((amount) => food.variations.includes(amount.food)).map((amount) => {
        const conversions = grams.find((g) => g.food === amount.food);
        const grams_ = conversions ? conversions.grams[0] * amount.quantity : amount.quantity;
        return {
          name: amount.food,
          grams: grams_,
        }
      });
      const factsPerFood = []
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