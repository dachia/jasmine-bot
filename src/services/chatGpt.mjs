import OpenAI from "openai";
import { retry } from "../utils/retry.mjs";


export class ChatGpt {
  client;

  constructor(options) {
    if (options.apiKey == null || options.organization == null) {
      throw new Error("OpenAiWrapper requires apiKey and organization to be set")
    }
    this.client = new OpenAI(options);
  }

  async createChatCompletion(args) {
    let response
    try {
      response = await retry(
        () => this.client.chat.completions.create(args)
      )
    } catch (err) {
      console.error(err.response?.data)
      throw err
    }
    return response
  }
}

