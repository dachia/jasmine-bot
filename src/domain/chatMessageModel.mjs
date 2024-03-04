import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
// Derived class
export class ChatMessageModel extends BaseModel {
  // id, userId, createdAt, updatedAt
  constructor({ content, role, sessionId, rawResponse, orderNumber, ...baseProps }, opts = {}) {
    super(baseProps, opts); // Call to the base class constructor
    this.data.content = content;
    this.data.role = role;
    this.data.rawResponse = rawResponse;
    this.data.orderNumber = orderNumber;
    this.data.sessionId = sessionId;
    createBaseClassGettersAndSetters(this)
  }
}