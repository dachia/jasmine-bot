import { ONBOARDING_FLOW } from '../domain/states.mjs';
import { setFlow } from './utils/flowManagement.mjs';
import { translationService } from "../services/singletones.mjs";
import { extractGrammyCtxData } from '../utils/extractGrammyCtxData.mjs';
import { getAddTelegramAccountUseCaseInstance } from '../useCases/getInstance.mjs';

export const startCommandController = async (ctx, client) => {
  const { name, telegramId } = extractGrammyCtxData(ctx)
  const addTelegramAccountUseCase = getAddTelegramAccountUseCaseInstance(client)
  const msg = ctx.message.text
  const userId = msg?.split(" ")[1]
  await addTelegramAccountUseCase.execute({ userId, accountId: telegramId })
  const trans = translationService.getTranslationsInstance(ctx)
  ctx.reply(trans.t("profile.onboarding_start", { name }))
  if (!ctx.session) {
    ctx.session = {};
  }

  setFlow(ctx, ONBOARDING_FLOW)
}