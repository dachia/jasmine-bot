import { FoodLogModel, NutritionFactsModel, STATE_COMPLETED } from "../domain/foodLogModel.mjs";
import { ChatSessionModel } from "../domain/chatSessionModel.mjs";
import { mapFoodItemsToSpecificFoodArray } from "../mappers/mapFoodItemsToSpecificFoodArray.mjs";
import { mapNutritionFactsServiceResponseToFoodLogFacts } from "../mappers/mapNutritionFactsServiceResponseToFoodLogFacts.mjs";

export class GetNutritionFactsUseCase {
  constructor(nutritionFactsGPTService, foodLogRepo) {
    this.nutritionFactsGPTService = nutritionFactsGPTService
    this.foodLogRepo = foodLogRepo;
  }
  async execute({ userId, foodLogId }) {
    const foodLog = await this.foodLogRepo.getById(foodLogId);
    if (!foodLog) {
      return null;
    }
    const factsRes = await this.nutritionFactsGPTService.execute({ foods: foodLog.foodChoices.map(f => f.chosenAmounts.name) });
    foodLog.foodChoices.forEach((f) => {
      const fact = factsRes.find((fact) => fact.input === f.chosenAmounts.name);
      if (fact) {
        f.data.facts = fact.foodDataFactsMatches.map(item => new NutritionFactsModel({ ...f.data, ...item }))
        f.data.chosenFactId = f.data.facts?.[0]?.id
      }
    })
    foodLog.isUpdated = true
    foodLog.data.state = STATE_COMPLETED
    await this.foodLogRepo.save(foodLog);
    return foodLog
  }
}