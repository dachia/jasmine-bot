import { deserializeModel, serializeModel } from '../utils/serializeModel.mjs';
// import { ChatMessageModel } from '../models/chatMessageModel.mjs';

export class GenericMongoRepo {
  constructor(mongoClient, collectionName, DomainModelClass, DomainCollectionClass) {
    this.client = mongoClient;
    this.collection = this.client.db().collection(collectionName);
    this.DomainCollectionClass = DomainCollectionClass;
    this.DomainModelClass = DomainModelClass;
  }
  
  deserializeModel(rawModel) {
    return deserializeModel(rawModel, this.DomainModelClass);
  }

  async find(query) {
    const raw = await this.collection.find(query).toArray();
    if (this.DomainCollectionClass) {
      return new this.DomainCollectionClass(...raw.map(this.deserializeModel.bind(this)));
    }
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