import { registerBotCommandHandlers, createBot } from './grammy.mjs';

export function startGrammy(client) {
  const bot = createBot();
  registerBotCommandHandlers(bot, client)
  bot.start()
  console.info("Bot started!")
  return bot
}