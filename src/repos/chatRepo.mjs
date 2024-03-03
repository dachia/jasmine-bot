export class ChatRepo {
  messages
  constructor() {
    this.messages = [];
  }
  async add({ userId, content, role }) {
    this.messages.push({ userId, content, role });
  }
  async getUserMessages(userId) {
    return this.messages.filter(message => message.userId === userId);
  }
}