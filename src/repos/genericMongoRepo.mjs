import { deserializeModel, serializeModel } from '../utils/serializeModel.mjs';
// import { ChatMessageModel } from '../models/chatMessageModel.mjs';

export class GenericMongoRepo {
  constructor(mongoClient, collectionName, DomainModelClass) {
    this.client = mongoClient;
    this.collection = this.client.db().collection(collectionName);
    this.DomainModelClass = DomainModelClass;
  }
  
  deserializeModel(rawModel) {
    return deserializeModel(rawModel, this.DomainModelClass);
  }

  async find(query) {
    const raw = await this.collection.find(query).toArray();
    return raw.map(this.deserializeModel.bind(this));
  }
  
  async remove({ userId, id }) {
    await this.collection.deleteOne({ userId, _id: id});
  }

  async getById(domainId) {
    const raw = await this.collection.findOne({ _id: domainId });
    if (raw) {
      return this.deserializeModel(raw);
    }
    return null;
  }

  async save(domainModel) {
    if (domainModel.isNew) {
      domainModel.isNew = false;
      await this.collection.insertOne(serializeModel(domainModel));
    } else if (domainModel.isUpdated) {
      await this.collection.updateOne({ _id: domainModel.id }, { $set: serializeModel(domainModel) });
    }
  }
}