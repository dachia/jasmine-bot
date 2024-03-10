import { LOG_FOOD_FLOW } from '../domain/states.mjs';
import { setCtxState, setFlow } from './utils/flowManagement.mjs';

export const logFoodCommandController = (ctx) => {
  if (!ctx.session) {
    ctx.session = {};
  }

  setFlow(ctx, LOG_FOOD_FLOW)
}