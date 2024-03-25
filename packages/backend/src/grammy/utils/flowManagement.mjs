import { getNextState } from "../../domain/states.mjs";
export function setNextCtxState(ctx) {
  if (!ctx.session) {
    ctx.session = {};
  }
  ctx.session.state = getNextState(ctx.session.state, ctx.session.currentFlow)
}

export function setFlow(ctx, flow) {
  if (!ctx.session) {
    ctx.session = {};
  }
  ctx.session.currentFlow = flow
  ctx.session.state = null
}