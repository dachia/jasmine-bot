export function extractGrammyCtxData(ctx) {
  if (!ctx.session) {
    ctx.session = {};
  }
  const chatId = ctx.chat.id;
  const message = ctx.message?.text;
  const callbackData = ctx.callbackQuery?.data;
  const userId = ctx.from.id;
  const state = ctx.session.state;
  return {
    chatId,
    userId,
    message,
    callbackData,
    state
  };
}