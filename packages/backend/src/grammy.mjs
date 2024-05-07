import { Bot, session, HttpError, GrammyError } from 'grammy';
import config from './config.mjs';
import { startCommandController } from "./grammy/startCommandController.mjs"
import { processStateController } from "./grammy/processStateController.mjs"
import { logFoodCommandController } from './grammy/logFoodCommandController.mjs';
import { mentalHealthCommandController } from './grammy/mentalHealthCommandController.mjs';
import { todaysReportCommandController } from './grammy/todaysReportCommandController.mjs';
import { skipButtonController } from './grammy/skipButtonController.mjs';
import { chooseGenderController } from './grammy/chooseGenderController.mjs';
import { GENDER_CHOICES } from './domain/genders.mjs';
import { ACTION_USER, DEFAULT_FLOW, getStateConfig } from './domain/states.mjs';
import { setNextCtxState, setFlow } from './grammy/utils/flowManagement.mjs';
import { deleteLogCommandController } from './grammy/deleteLogCommandController.mjs';
import { downloadDataCommand } from './grammy/downloadDataCommand.mjs';
import { updateWeightCommandController } from './grammy/updateWeightCommandController.mjs';
import { translationService } from "./services/singletones.mjs";
import { authMiddleware } from './grammy/utils/authMiddleware.mjs';
import { editLogCommandController } from './grammy/editLogCommandController.mjs';
import { confirmLogCommandController } from './grammy/confirmLogCommandController.mjs';
import { subscriptionMiddleware } from './grammy/utils/subscriptionMiddleware.mjs';


export function createBot() {
  return new Bot(config.TELEGRAM_API_TOKEN)
}

export async function stateMachine(ctx, client) {
  let action
  while (action !== ACTION_USER) {
    if (ctx.session?.currentFlow == null) {
      setFlow(ctx, DEFAULT_FLOW)
    }
    setNextCtxState(ctx)
    const state = ctx.session.state
    if (state == null) {
      setFlow(ctx, DEFAULT_FLOW)
      setNextCtxState(ctx)
    }
    action = getStateConfig(ctx.session.state).action
    if (action === ACTION_USER) {
      break
    }
    await processStateController(ctx, client)
  }
}

export function botContextToContext(ctx) {
  return {
    chatId: ctx.chat.id,
    from: ctx.from,
    message: ctx.message
  }
}


const executeMiddlewareWrapper = (middleware, client) => async (ctx, next) => {
  await middleware(ctx, client, next)
}
const executeNextWrapper = (command, client) => async (ctx) => {
  const state = ctx.session?.state
  if (state == null) {
    setFlow(ctx, DEFAULT_FLOW)
    setNextCtxState(ctx)
  }
  await command(ctx, client)
  await stateMachine(ctx, client)
}
export async function registerBotCommands(bot) {
  const trans = translationService.getTranslationsInstance(bot)
  await bot.api.setMyCommands([

    { command: "mental", description: trans.t("general.commands.mental") },
    { command: "food", description: trans.t("general.commands.food_log") },
    { command: "report", description: trans.t("general.commands.report") },
    { command: "set_weight", description: trans.t("general.commands.weight") },
    { command: "export", description: trans.t("general.commands.export") },
  ]);

}
export function registerBotCommandHandlers(bot, client) {
  bot.use(session({}))
  const authMiddlewareWithClient = executeMiddlewareWrapper(authMiddleware, client)
  const subscriptionMiddlewareWithClient = executeMiddlewareWrapper(subscriptionMiddleware, client)
  const middlewares = [authMiddlewareWithClient, subscriptionMiddlewareWithClient]
  bot.command('start', executeNextWrapper(startCommandController, client))
  bot.command('report', ...middlewares, executeNextWrapper(todaysReportCommandController, client))
  bot.command('mental', ...middlewares, executeNextWrapper(mentalHealthCommandController, client))
  bot.command('food', ...middlewares, executeNextWrapper(logFoodCommandController, client))
  bot.command('export', ...middlewares, executeNextWrapper(downloadDataCommand, client))
  bot.command('set_weight', ...middlewares, executeNextWrapper(updateWeightCommandController, client))
  bot.callbackQuery('skip-state', ...middlewares, executeNextWrapper(skipButtonController, client))
  for (const gender of GENDER_CHOICES) {
    bot.callbackQuery(gender.value, ...middlewares, executeNextWrapper(chooseGenderController, client))
  }
  bot.on("message", ...middlewares, executeNextWrapper(processStateController, client))
  bot.on('callback_query:data', ...middlewares, async (ctx) => {
    if (ctx.callbackQuery.data.includes("deleteLog")) {
      const id = ctx.callbackQuery.data.split(":")[1]
      await deleteLogCommandController(ctx, client, id)
      return
    }
    if (ctx.callbackQuery.data.includes("editLog")) {
      const id = ctx.callbackQuery.data.split(":")[1]
      await editLogCommandController(ctx, client, id)
      return
    }
    if (ctx.callbackQuery.data.includes("confirmLog")) {
      const id = ctx.callbackQuery.data.split(":")[1]
      await confirmLogCommandController(ctx, client, id)
      return
    }
  })
  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const errorRes = () => ctx.reply(`Ooops, something went wrong!\nPlease contact us at:\n- ${config.SUPPORT_EMAIL}\n- ${config.TELEGRAM_SUPPORT_CHANNEL}`)
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
      errorRes()
      throw e;
    } else {
      console.error("Unknown error:", e);
    }
    errorRes()
  });
  // bot.on('sticker', (ctx) => ctx.reply('👍'));
}