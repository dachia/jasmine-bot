import { Bot, session } from 'grammy';
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
import { setCtxState, setFlow } from './grammy/utils/flowManagement.mjs';
import { deleteLogCommandController } from './grammy/deleteLogCommandController.mjs';
import { downloadDataCommand } from './grammy/downloadDataCommand.mjs';


export function createBot() {
  return new Bot(config.TELEGRAM_API_TOKEN)
}

export async function stateMachine(ctx, client) {
  let action
  while (action !== ACTION_USER) {
    if (ctx.session?.currentFlow == null) {
      setFlow(ctx, DEFAULT_FLOW)
    }
    setCtxState(ctx)
    const state = ctx.session.state
    if (state == null) {
      setFlow(ctx, DEFAULT_FLOW)
      setCtxState(ctx)
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


const executeNextWrapper = (command, client) => async (ctx) => {
  await command(ctx, client)
  await stateMachine(ctx, client)
}
export async function registerBotCommands(bot) {
  await bot.api.setMyCommands([
    { command: "mental", description: "Having trouble sticking to the diet?" },
    { command: "food", description: "Log food" },
    { command: "report", description: "Daily report" },
    { command: "export", description: "Export data" },
  ]);

}
export function registerBotCommandHandlers(bot, client) {
  bot.use(session({}))
  bot.command('start', executeNextWrapper(startCommandController, client))
  bot.command('report', executeNextWrapper(todaysReportCommandController, client))
  bot.command('mental', executeNextWrapper(mentalHealthCommandController, client))
  bot.command('food', executeNextWrapper(logFoodCommandController, client))
  bot.command('export', executeNextWrapper(downloadDataCommand, client))
  bot.callbackQuery('skip-state', executeNextWrapper(skipButtonController, client))
  for (const gender of GENDER_CHOICES) {
    bot.callbackQuery(gender.value, executeNextWrapper(chooseGenderController, client))
  }
  bot.on("message", executeNextWrapper(processStateController, client))
  bot.on('callback_query:data', async (ctx) => {
    if (ctx.callbackQuery.data.includes("deleteLog")) {
      const id = ctx.callbackQuery.data.split(":")[1]
      await deleteLogCommandController(ctx, client, id)
      return
    }
  })
  // bot.on('sticker', (ctx) => ctx.reply('👍'));
}