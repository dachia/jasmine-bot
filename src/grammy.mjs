import { Bot, InlineKeyboard, Keyboard, session } from 'grammy';
import config from './config.mjs';
import { mentalChatUseCase } from './useCases/singletones.mjs';

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

const stopSessionMessage = "Stop session"

const sessionKeyboard = new Keyboard().text(stopSessionMessage).oneTime().resized()

export function registerBotCommandHandlers(bot) {
  bot.use(session())
  bot.command('sad', (ctx) => {
    ctx.reply('Send me a sticker!')
  });
  bot.on("message", async (ctx) => {
    const keyboard = { reply_markup: sessionKeyboard }
    const name = ctx.from.first_name;
    const message = ctx.message.text;
    // if (!ctx.session) {
    //   ctx.session = { state: "waiting-for-mood" };

    //   ctx.reply(`Hello. Describe in one word how are you feeling, ${name}?`, { ...keyboard });
    //   return
    // }
    if (message === stopSessionMessage) {
      ctx.session = null;
      ctx.reply(`Good luck with your day, ${name}!`);
      return
    }
    if (!ctx.session) {
      ctx.session = { state: "in-progress" };
      // ctx.session.mood = message;
      ctx.reply(`Hello. So what is bothering you, ${name}? Let me know how I can help you.`, { ...keyboard });
      return
    }
    if (ctx.session.state === "in-progress") {
      const state = ctx.session.mood;
      ctx.replyWithChatAction('typing');
      const response = await mentalChatUseCase.processMessage({ userId: ctx.from.id, message, state, name });
      ctx.reply(response, { ...keyboard });
    }
  })
  // bot.on('sticker', (ctx) => ctx.reply('👍'));
}