import { GenericMongoRepo } from "./genericMongoRepo.mjs";
import { ChatSessionModel } from "../domain/chatSessionModel.mjs";

export class ChatSessionRepo extends GenericMongoRepo {
  constructor(mongoClient) {
    super(mongoClient, 'chatSessions', ChatSessionModel);
  }
}