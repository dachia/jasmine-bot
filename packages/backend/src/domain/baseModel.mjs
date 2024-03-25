import { newId } from "../utils/genId.mjs"

// Base class
export class BaseModel {
  constructor({ id, _id, userId, createdAt, updatedAt }, opts = {}) {
    this.data = {
      id: _id ?? id ?? newId(),
      userId: userId,
      createdAt: createdAt ?? new Date(),
      updatedAt: this.isNew ? null : (updatedAt ?? new Date())
    }
    this.isNew = opts?.isNew ?? !id;
    this.isUpdated = false;
  }
  
  set id(value) {
    throw new Error('id is immutable');
  }
  
  set createdAt(value) {
    throw new Error('createdAt is immutable');
  }
  
  set updatedAt(value) {
    this.data.updatedAt = value;
  }
}