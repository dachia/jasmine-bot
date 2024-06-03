import { FoodLogModel, STATE_COMPLETED, STATE_PRE_PROMPT } from "../domain/foodLogModel.mjs";
import { mapFoodItemsToSpecificFoodArray } from "../mappers/mapFoodItemsToSpecificFoodArray.mjs";

export class ProcessAmountsAndSpecificFoodsUseCaseV2 {
  constructor(parseFreeTextPromptService, convertToGramsService, foodLogRepo) {
    this.parseFreeTextPromptService = parseFreeTextPromptService
    this.convertToGramsService = convertToGramsService
    this.foodLogRepo = foodLogRepo;
  }
  async execute({ userId, prompt, date, foodLogId }) {
    if (foodLogId) {
      await this.foodLogRepo.delete({ userId, id: foodLogId });
    }
    const foods = await this.parseFreeTextPromptService.execute({ prompt });
    let grams = []
    let state = STATE_COMPLETED
    if (!foods) {
      return null;
    }
    if (foods?.find(i => !['g', 'grams'].includes(i.parsed_amount_unit))) {
      grams = await this.convertToGramsService.execute({ foods });
      state = STATE_PRE_PROMPT
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
      foodChoices,
      state
    });
    await this.foodLogRepo.save(foodLog);
    return foodLog
  }
}