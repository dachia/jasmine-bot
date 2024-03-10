import { getUpdateProfileUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import yup from 'yup';


export async function setStepsController(ctx, client) {
  const { message, userId } = extractGrammyCtxData(ctx);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);


  try {
    yup.number().validateSync(message);
  } catch (error) {
    console.error(error);
    ctx.reply("Invalid number format. Please use a positive number")
    return
  }

  await updateProfileUseCase.execute({ userId, steps: message ? Number(message) : null });
}