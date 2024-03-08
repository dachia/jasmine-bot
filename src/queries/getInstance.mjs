import { DailyReportQuery } from "./dailyReportQuery.mjs"
import { FoodLogRepo } from "../repos/foodLogRepo.mjs";

export function getDailyReportQueryInstance(client) {
  const foodLogRepo = new FoodLogRepo(client);
  return new DailyReportQuery(foodLogRepo);
}