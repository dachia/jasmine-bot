import { FoodLogModelCollection } from '../domain/foodLogModel.mjs';
export class DailyReportQuery {
  constructor(foodLogRepo) {
    this.foodLogRepo = foodLogRepo;
  }
  
  async execute({ userId, date }) {
    const logs = await this.foodLogRepo.find({ userId, date });
    const collection = new FoodLogModelCollection(...logs);
    return collection
  }
}