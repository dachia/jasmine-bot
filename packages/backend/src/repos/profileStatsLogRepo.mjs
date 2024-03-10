import { ProfileStatsLogModel } from "../domain/profileStatsLogModel.mjs";
import { GenericMongoRepo } from "./genericMongoRepo.mjs";

export class ProfileStatsLogRepo extends GenericMongoRepo {
  constructor(mongoClient) {
    super(mongoClient, 'profileStatsLog', ProfileStatsLogModel);
  }
}