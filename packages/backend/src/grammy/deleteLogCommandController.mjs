
import { getDeleteLogUseCaseInstance } from "../useCases/getInstance.mjs";
import { translationService } from "../services/singletones.mjs";
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";

export const deleteLogCommandController = async (ctx, client, id) => {
  const trans = translationService.getTranslationsInstance(ctx)
  const { userId } = extractGrammyCtxData(ctx)
  await getDeleteLogUseCaseInstance(client).execute({ userId, id})
  ctx.reply(trans.t("food_log.delete_success"))
}