import { STATES_EDIT_PROFILE } from '../domain/states.mjs';

export const todaysReportCommandController = (ctx) => {
  ctx.reply("Not implemented yet.")
  if (!ctx.session) {
    ctx.session = {};
  }

  // ctx.session.state = getNextState(null, STATES_EDIT_PROFILE)
}