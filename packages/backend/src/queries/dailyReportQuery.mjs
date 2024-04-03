import { STATE_COMPLETED } from "../domain/foodLogModel.mjs";
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { startOfDay, endOfDay } from 'date-fns';

export class DailyReportQuery {
  constructor(foodLogRepo, profileRepo, userRepo) {
    this.foodLogRepo = foodLogRepo;
    this.profileRepo = profileRepo;
    this.userRepo = userRepo;
  }

  async execute({ userId, date }) {
    const profile = (await this.profileRepo.find({ userId }))[0];
    const user = await this.userRepo.getById(userId);
    const startOfDay_ = zonedTimeToUtc(startOfDay(utcToZonedTime(date, user.timezone)), user.timezone);
    const endOfDay_ = zonedTimeToUtc(endOfDay(utcToZonedTime(date, user.timezone)), user.timezone);
    const logs = await this.foodLogRepo.find({
      userId,
      createdAt: { $gte: startOfDay_, $lte: endOfDay_ },
      state: STATE_COMPLETED
    });
    const total = logs.asNutritionFactsCollection().sum()
    const estimatedBurnPerDay = profile?.estimatedBurnPerDay ?? null
    const calorieDeficit = estimatedBurnPerDay - (total?.kcal ?? 0)
    return {
      logs,
      profile,
      computed: {
        calorieDeficit,
        total,
      }
    }
  }
}