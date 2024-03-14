import { GenericMongoRepo } from "./genericMongoRepo.mjs";
import { UserModel } from "../domain/userModel.mjs";

export class UserRepo extends GenericMongoRepo {
  constructor(mongoClient) {
    super(mongoClient, 'users', UserModel);
  }
  async getByEmail(email) {
    const users = await this.find({ email });
    if (users.length > 0) {
      return users[0];
    }
    return null;
  }
}