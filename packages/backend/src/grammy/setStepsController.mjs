import { getUpdateProfileUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import yup from 'yup';
import { translationService } from "../services/singletones.mjs";


export async function setStepsController(ctx, client) {
  const trans = translationService.getTranslationsInstance(ctx)
  const { message, userId } = extractGrammyCtxData(ctx);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);


  try {
    yup.number().validateSync(message);
  } catch (error) {
    console.error(error);
    ctx.reply(trans.t("errors.invalid_number_format"))
    return
  }

  await updateProfileUseCase.execute({ userId, steps: message ? Number(message) : null });
}