import { DailyReportQuery } from "./dailyReportQuery.mjs"
import { FoodLogRepo } from "../repos/foodLogRepo.mjs";
import { ProfileQuery } from "./profileQuery.mjs"
import { ProfileRepo } from "../repos/profileRepo.mjs";
import { UserRepo } from "../repos/userRepo.mjs";
import { UserQuery } from "./userQuery.mjs"

export function getUserQueryInstance(client) {
  const userRepo = new UserRepo(client);
  return new UserQuery(userRepo);
}

export function getProfileQueryInstance(client) {
  const profileRepo = new ProfileRepo(client);
  return new ProfileQuery(profileRepo);
}

export function getDailyReportQueryInstance(client) {
  const userRepo = new UserRepo(client);
  const profileRepo = new ProfileRepo(client);
  const foodLogRepo = new FoodLogRepo(client);
  return new DailyReportQuery(foodLogRepo, profileRepo, userRepo);
}