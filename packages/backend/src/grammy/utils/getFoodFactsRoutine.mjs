import { InlineKeyboard } from 'grammy';
import { getGetNutritionFactsUseCaseInstance } from '../../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../../utils/extractGrammyCtxData.mjs";
// import { mapNutritionFactsCollectionToAsciiTable } from "../mappers/mapNutritionFactsCollectionToAsciiTable.mjs";
import { translationService } from '../../services/singletones.mjs';
import { mapNutritionFactsCollectionToAsciiTable } from '../../mappers/mapNutritionFactsCollectionToAsciiTable.mjs';

export async function getFoodFactsRoutine(ctx, client, id) {
  const trans = translationService.getTranslationsInstance(ctx)
  const getNutritionFactsUseCase = getGetNutritionFactsUseCaseInstance(client);
  const {  userId } = extractGrammyCtxData(ctx);
  ctx.replyWithChatAction('typing');

  const foodLogWithFacts = await getNutritionFactsUseCase.execute({ userId, foodLogId: id });
  const text = mapNutritionFactsCollectionToAsciiTable(foodLogWithFacts.perItemNutritionFacts, trans);
  await ctx.reply(`<pre>${text}</pre>`, { parse_mode: "HTML", reply_markup: new InlineKeyboard().text(trans.t("food_log.delete_entry"), `deleteLog:${id}`) });
}