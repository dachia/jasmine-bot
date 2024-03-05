import { deserializeModel, serializeModel } from '../utils/serializeModel.mjs';
// import { ChatMessageModel } from '../models/chatMessageModel.mjs';

export class GenericMongoRepo {
  constructor(mongoClient, collectionName, DomainModelClass) {
    this.client = mongoClient;
    this.collection = this.client.db().collection(collectionName);
    this.DomainModelClass = DomainModelClass;
  }

  async getSession(domainId) {
    const raw = await this.collection.findOne({ _id: domainId });
    if (raw) {
      const model = deserializeModel(raw, this.DomainModelClass);
      return model;
    }
    return null;
  }

  async saveSession(domainModel) {
    if (domainModel.isNew) {
      domainModel.isNew = false;
      await this.collection.insertOne(serializeModel(domainModel));
    } else if (domainModel.isUpdated) {
      await this.collection.updateOne({ id: domainModel.id }, { $set: serializeModel(domainModel) });
    }
  }
}