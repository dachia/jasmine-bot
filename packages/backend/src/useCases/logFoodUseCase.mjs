import { FoodLogModel } from "../domain/foodLogModel.mjs";
import { ChatSessionModel } from "../domain/chatSessionModel.mjs";

export class LogFoodUseCase {
  constructor(nutritionInfoService, foodLogRepo, chatRepo) {
    this.nutritionInfoService = nutritionInfoService;
    this.foodLogRepo = foodLogRepo;
    this.chatRepo = chatRepo;
  }
  async execute({ userId, prompt, date }) {
    const session = new ChatSessionModel({ userId, problemStatement: prompt });
    session.addMessage({ content: prompt, role: 'user' });

    const nutritionInfo = await this.nutritionInfoService.getNutritionInfo({ prompt });
    session.addMessage({ content: "", role: 'assistant', rawResponse: nutritionInfo });
    const foodLog = new FoodLogModel({
      userId,
      prompt,
      date,
      sessionId: session.id,
      totalNutritionFacts: nutritionInfo.nutritionFactsTotal, 
      perItemNutritionFacts: nutritionInfo.nutritionFactsPerPortion
    });
    await this.foodLogRepo.save(foodLog);
    await this.chatRepo.save(session);
    return foodLog
  }
}