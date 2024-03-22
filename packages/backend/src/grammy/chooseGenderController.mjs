import { getUpdateProfileUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { GENDER_CHOICES } from "../domain/genders.mjs";
import yup from 'yup';

const genderSchema = yup.string().oneOf(GENDER_CHOICES.map(m => m.value)).required();

export async function chooseGenderController(ctx, client) {
  const { userId,  message, callbackData } = extractGrammyCtxData(ctx);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);
  const gender_ = message?.toLowerCase() ?? callbackData

  try {
    genderSchema.validateSync(gender_);
  } catch (error) {
    await ctx.reply(`Invalid gender. Please choose one of ${GENDER_CHOICES.map(m => m.name).join(', ')}`)
    return
  }
  await updateProfileUseCase.execute({ userId, gender: gender_ });
}