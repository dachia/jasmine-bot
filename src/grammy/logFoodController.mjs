import { InlineKeyboard } from 'grammy';
import { getLogFoodUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";


export async function logFoodController(ctx, client) {
  const logFoodUseCase = getLogFoodUseCaseInstance(client);
  const { message, userId } = extractGrammyCtxData(ctx);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  ctx.replyWithChatAction('typing');
  const foodLog = await logFoodUseCase.execute({ userId, prompt: message, date });
  ctx.reply(`<pre>${foodLog.toASCII()}</pre>`, { parse_mode: "HTML", reply_markup: new InlineKeyboard().text("Delete entry", `deleteLog:${foodLog.id}`) });
}