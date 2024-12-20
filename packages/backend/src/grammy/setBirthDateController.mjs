import { getUpdateProfileUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { translationService } from "../services/singletones.mjs";
import yup from 'yup';

const birthDateSchema = yup.date().required();

export async function setBirthDateController(ctx, client) {
  const trans = translationService.getTranslationsInstance(ctx)
  const { message,userId } = extractGrammyCtxData(ctx);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);
  try {
    birthDateSchema.validateSync(message);
  } catch (error) {
    await ctx.reply(trans.t("errors.invalid_date_format"))
    return
  }
  await updateProfileUseCase.execute({ userId, birthDate: new Date(message)});
}