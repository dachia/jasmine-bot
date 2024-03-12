import { ONBOARDING_FLOW } from '../domain/states.mjs';
import { setCtxState, setFlow } from './utils/flowManagement.mjs';
import { translationService } from "../services/singletones.mjs";
import { extractGrammyCtxData } from '../utils/extractGrammyCtxData.mjs';

export const startCommandController = (ctx) => {
  const { name } = extractGrammyCtxData(ctx)
  const trans = translationService.getTranslationsInstance(ctx)
  ctx.reply(trans.t("profile.onboarding_start", { name }))
  if (!ctx.session) {
    ctx.session = {};
  }

  setFlow(ctx, ONBOARDING_FLOW)
}