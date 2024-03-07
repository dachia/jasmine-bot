import { Keyboard } from 'grammy';
import { STATES_LOG_FOOD } from '../domain/states.mjs';
const startSessionMessage = "Mental health"

export const logFoodCommandController = (ctx) => {
  const foodLogKeyboard = { reply_markup: new Keyboard().text(startSessionMessage).oneTime().resized() }
  if (!ctx.session) {
    ctx.session = {};
  }

  ctx.session.state = STATES_LOG_FOOD.WAITING_FOR_FOOD
  ctx.reply("Message me the food you ate", { ...foodLogKeyboard })
}