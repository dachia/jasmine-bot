// import { mapFoodLogToConfirmResponse } from "../mappers/mapFoodLogToConfirmResponse.mjs";
// import { FoodLogRepo } from "../repos/foodLogRepo.mjs";
// import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { getDeleteLogUseCaseInstance } from "../useCases/getInstance.mjs";
import { translationService } from "../services/singletones.mjs";
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { setFlow, setNextCtxState } from "./utils/flowManagement.mjs";
import { PROCESS_FOOD_FLOW } from "../domain/states.mjs";

export const editLogCommandController = async (ctx, client, id) => {
  const trans = translationService.getTranslationsInstance(ctx)
  const { userId } = extractGrammyCtxData(ctx)
  ctx.replyWithChatAction('typing');
  await getDeleteLogUseCaseInstance(client).execute({ userId, id})
  await ctx.reply(trans.t("food_log.editing"), {  reply_markup: { force_reply: true } })
  setFlow(ctx, PROCESS_FOOD_FLOW)
  setNextCtxState(ctx)
}