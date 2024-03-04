import { BaseModel } from './baseModel.mjs';
import { ChatMessageModel } from './chatMessageModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
// Derived class
export class ChatSessionModel extends BaseModel {
  constructor({ problemStatement, messages, ...baseProps}, opts = {}) {
    super(baseProps, opts); // Call to the base class constructor
    this.data.problemStatement = problemStatement;
    this.data.messages = messages ?? [];
    createBaseClassGettersAndSetters(this)
  }
  
  addMessage(messageProps) {
    this.data.messages.push(new ChatMessageModel({
      ...messageProps,
      sessionId: this.data.id,
      orderNumber: this.data.messages.length,
    }));
  }
}