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
    grams = await this.convertToGramsService.execute({ foods });
    if (foods?.find(i => !['g', 'grams'].includes(i.parsed_amount_unit))) {
      state = STATE_PRE_PROMPT
    }

    const foodChoices = foods.map((food) => {
      const amountsPerFood = grams.find(g => g.food === food.most_popular_variety)
      const amounts = amountsPerFood.grams_in_unit * food.parsed_amount_quantity
      return {
        food: food.most_popular_variety,
        amounts: [{
          name: food.most_popular_variety,
          grams: amounts,
        }],
        facts: []
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