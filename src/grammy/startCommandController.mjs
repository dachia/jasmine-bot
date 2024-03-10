import { ONBOARDING_FLOW } from '../domain/states.mjs';
import { setCtxState, setFlow } from './utils/flowManagement.mjs';

export const startCommandController = (ctx) => {
  ctx.reply("Hi. Let's gather get your biometric data so I can help you better")
  if (!ctx.session) {
    ctx.session = {};
  }

  setFlow(ctx, ONBOARDING_FLOW)
}