import { getUpdateProfileUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import yup from 'yup';

const birthDateSchema = yup.date().required();

export async function setBirthDateController(ctx, client) {
  const { message,userId } = extractGrammyCtxData(ctx);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);
  try {
    birthDateSchema.validateSync(message);
  } catch (error) {
    ctx.reply("Invalid date format. Please use YYYY-MM-DD")
    return
  }
  await updateProfileUseCase.execute({ userId, birthDate: new Date(message)});
}