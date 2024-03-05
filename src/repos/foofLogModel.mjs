import { GenericMongoRepo } from "./genericMongoRepo.mjs";
import { FoodLogModel } from "../domain/foodLogModel.mjs";

export class FoodLogRepo extends GenericMongoRepo {
  constructor(mongoClient) {
    super(mongoClient, 'foodLog', FoodLogModel);
  }
}