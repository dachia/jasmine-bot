export class DailyReportQuery {
  constructor(foodLogRepo) {
    this.foodLogRepo = foodLogRepo;
  }
  
  async execute({ userId, date }) {
    const logs = await this.foodLogRepo.find({ userId, date });
    return logs
  }
}