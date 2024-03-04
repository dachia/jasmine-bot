import { BaseModel } from '../domain/baseModel.mjs';
// Function to serialize baseModel by extracting the data property. Iterating over data and if value is instance of BaseModel serializing it recursively.
export function serializeModel(model) {
  const serialized = {};
  for (let key in model.data) {
    const value = model[key];
    if (Array.isArray(value)) {
      serialized[key] = value.map(serializeModel);  
    } else if (value instanceof BaseModel) {
      serialized[key] = serializeModel(value);
    } else {
      serialized[key] = value;
    }
  }
  return serialized;
}