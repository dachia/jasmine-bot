import { ChatGpt } from "./chatGpt.mjs";
import { MentalChat } from "./mentalChat.mjs";
import config from "../config.mjs";

const client = new ChatGpt({
  apiKey: config.OPENAI_API_KEY,
  organization: config.OPENAI_ORG_ID
});
export const mentalChat = new MentalChat(client);