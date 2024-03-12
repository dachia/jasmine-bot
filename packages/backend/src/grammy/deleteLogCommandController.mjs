
import { getDeleteLogUseCaseInstance } from "../useCases/getInstance.mjs";
import { translationService } from "../services/singletones.mjs";

export const deleteLogCommandController = async (ctx, client, id) => {
  const trans = translationService.getTranslationsInstance(ctx)
  await getDeleteLogUseCaseInstance(client).execute({ userId: ctx.from.id, id})
  ctx.reply(trans.t("food_log.delete_success"))
}