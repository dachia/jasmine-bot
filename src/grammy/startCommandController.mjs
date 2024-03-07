import { STATES_EDIT_PROFILE } from '../domain/states.mjs';

export const startCommandController = (ctx) => {
  ctx.reply("Hi. Let's gather get your biometric data so I can help you better.\nWhat is your birth date? (YYYY-MM-DD)")
  if (!ctx.session) {
    ctx.session = {};
  }

  ctx.session.state = getNextState(null, STATES_EDIT_PROFILE)
}