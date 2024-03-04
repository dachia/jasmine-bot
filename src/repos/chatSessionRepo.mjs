import { ChatSessionModel } from '../domain/chatSessionModel.mjs';
import { serializeModel } from '../utils/serializeModel.mjs';
// import { ChatMessageModel } from '../models/chatMessageModel.mjs';
export class ChatSessionRepo {
  constructor() {
    // this.messages = [];
    this.sessions = []
  }
  async getSession(sessionId) {
    const raw = this.sessions.find(session => session.id === sessionId);
    if (raw) {
      const model = new ChatSessionModel(raw) 
      return model
    }
    return null
  }
  
  async saveSession(session) {
    if (session.isNew) {
      session.isNew = false
      this.sessions.push(serializeModel(session));
    } else if (session.isUpdated) {
      const index = this.sessions.findIndex(s => s.id === session.id);
      this.sessions[index] = serializeModel(session);
    }
  }

  // async addSessionMessage(message) {
  //   this.messages.push(message);
  // }
  // async getSessionMessages(sessionId) {
  //   const raw = this.messages.filter(message => message.sessionId === sessionId);
  //   return raw.map(message => new ChatMessageModel(message))
  // }
}