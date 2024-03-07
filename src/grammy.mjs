import { Bot, session } from 'grammy';
import config from './config.mjs';
import { startCommandController } from "./grammy/startCommandController.mjs"
import { messageController } from "./grammy/messageController.mjs"
import { logFoodCommandController } from './grammy/logFoodCommandController.mjs';
import { mentalHealthCommandController } from './grammy/mentalHealthCommandController.mjs';
import { todaysReportCommandController } from './grammy/todaysReportCommandController.mjs';


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
// mental-health - Seek mental coaching to achieve your fitness goals
// food-logging - Log food and track calories
// todays-report - Calories in/Calories out
  bot.command('report', (ctx) => todaysReportCommandController(ctx, client))
  bot.command('mental', (ctx) => mentalHealthCommandController(ctx, client))
  bot.command('food', (ctx) => logFoodCommandController(ctx, client))
  bot.on("message", (ctx) => messageController(ctx, client))
  // bot.on('sticker', (ctx) => ctx.reply('👍'));
}