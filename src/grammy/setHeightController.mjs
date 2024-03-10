import { getUpdateProfileUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { numberSchema } from './utils/validators.mjs';


export async function setHeightController(ctx, client) {
  const { message, userId } = extractGrammyCtxData(ctx);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);

  try {
    numberSchema.validateSync(message);
  } catch (error) {
    ctx.reply("Invalid number format. Please use a positive number")
    return
  }
  await updateProfileUseCase.execute({ userId, height: Number(message)});
}