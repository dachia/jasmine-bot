import { registerBotCommandHandlers, registerBotCommands, createBot } from './grammy.mjs';

export async function startGrammy(client) {
  const bot = createBot();
  registerBotCommandHandlers(bot, client)
  await registerBotCommands(bot)
  bot.start()
  console.info("Bot started!")
  return bot
}