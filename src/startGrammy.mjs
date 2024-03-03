import { registerBotCommandHandlers, createBot } from './grammy.mjs';

export function startGrammy() {
  const bot = createBot();
  registerBotCommandHandlers(bot)
  bot.start()
  console.info("Bot started!")
}