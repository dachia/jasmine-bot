import { BaseModel } from './baseModel.mjs';
import { ChatMessageModel } from './chatMessageModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
// Derived class
export class ChatSessionModel extends BaseModel {
  constructor({ problemStatement, messages, ...baseProps}, opts = {}) {
    super(baseProps, opts); // Call to the base class constructor
    this.data.problemStatement = problemStatement;

    this.data.messages = messages?.map(item => item instanceof BaseModel ? item : new ChatMessageModel({ ...baseProps, ...item })) ?? []
    createBaseClassGettersAndSetters(this)
  }
  
  addMessage(messageProps) {
    this.isUpdated = true;
    this.data.messages.push(new ChatMessageModel({
      ...messageProps,
      sessionId: this.data.id,
      userId: this.data.userId,
      orderNumber: this.data.messages.length,
    }));
  }
}