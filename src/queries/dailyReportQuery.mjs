export class DailyReportQuery {
  constructor(foodLogRepo, profileRepo) {
    this.foodLogRepo = foodLogRepo;
    this.profileRepo = profileRepo;
  }

  async execute({ userId, date }) {
    const logs = await this.foodLogRepo.find({ userId, date });
    const profile = (await this.profileRepo.find({ userId }))[0];
    const total = logs.asNutritionFactsCollection().sum()
    const estimatedBurnPerDay = profile.estimatedBurnPerDay
    const calorieDeficit = estimatedBurnPerDay - (total.kcal ?? 0)
    const proteinDeficit = profile.recommendedProtein - (total.protein ?? 0)
    return {
      logs,
      balance: {
        proteinDeficit,
        calorieDeficit,
      }
    }
  }
}