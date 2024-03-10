import { UPDATE_WEIGHT_FLOW } from '../domain/states.mjs';
import { setFlow } from './utils/flowManagement.mjs';

export const updateWeightCommandController = (ctx) => {
  if (!ctx.session) {
    ctx.session = {};
  }

  setFlow(ctx, UPDATE_WEIGHT_FLOW)
  return
}