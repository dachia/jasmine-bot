import { getUpdateProfileUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";


export async function setActivityLevelController(ctx, client) {
  const { message, userId } = extractGrammyCtxData(ctx);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);
  await updateProfileUseCase.execute({ userId, activityLevel: message });
}