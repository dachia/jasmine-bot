export function extractGrammyCtxData(ctx) {
  if (!ctx.session) {
    ctx.session = {};
  }
  const chatId = ctx.chat.id;
  const message = ctx.message?.text;
  const name = ctx.from?.first_name;
  const callbackData = ctx.callbackQuery?.data;
  const userId = ctx.from.id;
  const state = ctx.session.state;
  return {
    name,
    chatId,
    userId,
    message,
    callbackData,
    state
  };
}