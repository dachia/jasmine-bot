import { MENTAL_HEALTH_FLOW } from '../domain/states.mjs';
import { setNextCtxState, setFlow } from './utils/flowManagement.mjs';

export const mentalHealthCommandController = (ctx) => {
  if (!ctx.session) {
    ctx.session = {};
  }
  
  ctx.session.id = null
  setFlow(ctx, MENTAL_HEALTH_FLOW)
  return
}