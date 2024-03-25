import { LOG_FOOD_FLOW_CMD } from '../domain/states.mjs';
import { setNextCtxState, setFlow } from './utils/flowManagement.mjs';

export const logFoodCommandController = (ctx) => {
  if (!ctx.session) {
    ctx.session = {};
  }

  setFlow(ctx, LOG_FOOD_FLOW_CMD)
}