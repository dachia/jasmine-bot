import { Keyboard } from 'grammy';
import { STATES_MENTAL_HEALTH } from '../domain/states.mjs';
const startLoggingMessage = "Food log"

export const mentalHealthCommandController = (ctx) => {
  const mentalSessionKeyboard = { reply_markup: new Keyboard().text(startLoggingMessage).oneTime().resized() }
  const name = ctx.from.first_name;

  if (!ctx.session) {
    ctx.session = {};
  }

  ctx.session.state = STATES_MENTAL_HEALTH.WAITING_FOR_MENTAL_INPUT
  ctx.reply(`Hello. So what is bothering you, ${name}? Let me know how I can help you.`, { ...mentalSessionKeyboard });
  return
}