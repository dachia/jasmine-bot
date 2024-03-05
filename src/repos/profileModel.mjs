import { GenericMongoRepo } from "./genericMongoRepo.mjs";
import { ProfileModel } from "../domain/profileModel.mjs";

export class ProfileRepo extends GenericMongoRepo {
  constructor(mongoClient) {
    super(mongoClient, 'profile', ProfileModel);
  }
}