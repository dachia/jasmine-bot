import { GenericMongoRepo } from "./genericMongoRepo.mjs";
import { UserModel } from "../domain/userModel.mjs";

export class UserRepo extends GenericMongoRepo {
  constructor(mongoClient) {
    super(mongoClient, 'users', UserModel);
  }
  async getByAccountId(accountId) {
    const users = await this.find({ "accounts.accountId": accountId });
    if (users.length > 0) {
      return users[0];
    }
    return null;
  }
  async getByEmail(email) {
    const users = await this.find({ email });
    if (users.length > 0) {
      return users[0];
    }
    return null;
  }
}