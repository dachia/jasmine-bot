import { Bot, session } from 'grammy';
import config from './config.mjs';
import { startCommandController } from "./grammy/startCommandController.mjs"
import { messageController } from "./grammy/messageController.mjs"


export function createBot() {
  return new Bot(config.TELEGRAM_API_TOKEN)
}

export function botContextToContext(ctx) {
  return {
    chatId: ctx.chat.id,
    from: ctx.from,
    message: ctx.message
  }
}


export function registerBotCommandHandlers(bot, client) {
  bot.use(session({}))
  bot.command('start', (ctx) => startCommandController(ctx, client))
  bot.on("message", (ctx) => messageController(ctx, client))
  // bot.on('sticker', (ctx) => ctx.reply('👍'));
}