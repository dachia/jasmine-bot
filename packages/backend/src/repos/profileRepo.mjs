import { GenericMongoRepo } from "./genericMongoRepo.mjs";
import { ProfileModel } from "../domain/profileModel.mjs";

export class ProfileRepo extends GenericMongoRepo {
  constructor(mongoClient) {
    super(mongoClient, 'profile', ProfileModel);
  }
  
  async getByUserId(userId) {
    const profiles = await this.find({ userId });
    if (profiles.length > 0) {
      return profiles[0];
    }
    return null;
  }
}