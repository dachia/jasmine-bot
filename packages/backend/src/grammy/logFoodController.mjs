import { InlineKeyboard } from 'grammy';
import { getProcessAmountsAndSpecificFoodsUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
// import { mapNutritionFactsCollectionToAsciiTable } from "../mappers/mapNutritionFactsCollectionToAsciiTable.mjs";
import { translationService } from '../services/singletones.mjs';
import { mapFoodLogToConfirmResponse } from '../mappers/mapFoodLogToConfirmResponse.mjs';
import { STATE_PRE_PROMPT } from '../domain/foodLogModel.mjs';
import { getFoodFactsRoutine } from './utils/getFoodFactsRoutine.mjs';

export async function logFoodController(ctx, client) {
  const trans = translationService.getTranslationsInstance(ctx)
  const processAmountsUseCase = getProcessAmountsAndSpecificFoodsUseCaseInstance(client);
  const { message, userId } = extractGrammyCtxData(ctx);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  ctx.replyWithChatAction('typing');
  const foodLog = await processAmountsUseCase.execute({ userId, prompt: message, date });
  if (foodLog == null) {
    await ctx.reply(trans.t("food_log.not_found"))
    return
  }
  if (foodLog.state === STATE_PRE_PROMPT) {
    const text = mapFoodLogToConfirmResponse(foodLog, trans)
    await ctx.reply(text, {
      reply_markup: new InlineKeyboard()
        .text(trans.t("food_log.confirm_entry"), `confirmLog:${foodLog.id}`)
        .text(trans.t("food_log.edit_entry"), `editLog:${foodLog.id}`)
    });
  } else {
    await getFoodFactsRoutine(ctx, client, foodLog.id);
  }
}