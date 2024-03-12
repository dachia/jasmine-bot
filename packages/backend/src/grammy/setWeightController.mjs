import { getUpdateProfileUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { numberSchema } from './utils/validators.mjs';
import { translationService } from "../services/singletones.mjs";


export async function setWeightController(ctx, client) {
  const trans = translationService.getTranslationsInstance(ctx)
  const { message, userId } = extractGrammyCtxData(ctx);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);

  try {
    numberSchema.validateSync(message);
  } catch (error) {
    ctx.reply(trans.t("errors.invalid_number_format"))
    return
  }
  await updateProfileUseCase.execute({ userId, weight: Number(message)});
}