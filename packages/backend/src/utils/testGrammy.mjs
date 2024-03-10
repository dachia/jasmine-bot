import { createBot, registerBotCommandHandlers } from "../grammy.mjs";
import { client } from "./testDatabase.mjs";

export let grammy
export let outgoingRequests = [];

export function generateMessage(message) {
  return {
    update_id: 10000,
    message: {
      date: 1441645532,
      chat: {
        last_name: "Test Lastname",
        id: 1111111,
        first_name: "Test",
        username: "Test",
      },
      message_id: 1365,
      from: {
        last_name: "Test Lastname",
        id: 1111111,
        first_name: "Test",
        username: "Test",
      },
      text: message,
    },
  };
}

before(async () => {
  grammy = createBot();
  registerBotCommandHandlers(grammy, client);
  grammy.api.config.use((prev, method, payload, signal) => {
    outgoingRequests.push({ method, payload, signal });
    return { ok: true, result: true };
  });

  grammy.botInfo = {
    id: 42,
    first_name: "Test Bot",
    is_bot: true,
    username: "bot",
    can_join_groups: true,
    can_read_all_group_messages: true,
    supports_inline_queries: false,
  };
  await grammy.init();
}, 5000)

beforeEach(() => {
  outgoingRequests = [];
});