import OpenAI from "openai";
import { retry } from "../utils/retry.mjs";


export class ChatGpt {
  client;


  constructor(options) {
    if (options.apiKey == null || options.organization == null) {
      throw new Error("OpenAiWrapper requires apiKey and organization to be set")
    }
    this.client = new OpenAI(options);
    this.defaultParams = {
      response_format: {
        type: 'json_object',
      },
      model: 'gpt-4-turbo-preview',
      temperature: 0,
    }
  }

  async processPrompt(prompt, opts) {
    let response
    try {
      response = await retry(
        () => this.client.chat.completions.create({
          ...this.defaultParams,
          ...(opts ?? {}),
          messages: prompt
        })
      )
    } catch (err) {
      console.error(err.response?.data)
      throw err
    }
    return response
  }
}

