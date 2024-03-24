import { InlineKeyboard } from 'grammy';
import { getLogFoodUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { mapNutritionFactsCollectionToAsciiTable } from "../mappers/mapNutritionFactsCollectionToAsciiTable.mjs";
import { translationService } from '../services/singletones.mjs';

export async function logFoodController(ctx, client) {
  const trans = translationService.getTranslationsInstance(ctx)
  const logFoodUseCase = getLogFoodUseCaseInstance(client);
  const { message, userId } = extractGrammyCtxData(ctx);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  ctx.replyWithChatAction('typing');
  const foodLog = await logFoodUseCase.execute({ userId, prompt: message, date });
  if (foodLog == null) {
    await ctx.reply(trans.t("food_log.not_found"))
    return
  }
  await ctx.reply(`Foods in the meal:`)
  for (const foodChoice of foodLog.foodChoices) {
    let kb = new InlineKeyboard()
    for (const fact of foodChoice.facts) {
      kb = kb.text(fact.name, fact.id)
    }

    await ctx.reply(`${foodChoice.chosenFacts.name}, ${foodChoice.chosenAmounts.grams}g`, {
      reply_markup: kb
    })
  }
  const text = mapNutritionFactsCollectionToAsciiTable(foodLog.perItemNutritionFacts, trans).toString()
  await ctx.reply(`<pre>${text}</pre>`, { parse_mode: "HTML", reply_markup: new InlineKeyboard().text(trans.t("food_log.delete_entry"), `deleteLog:${foodLog.id}`) });
}