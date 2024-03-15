export function extractGrammyCtxData(ctx) {
  if (!ctx.session) {
    ctx.session = {};
  }
  const chatId = ctx.chat.id;
  const message = ctx.message?.text;
  const name = ctx.from?.first_name;
  const callbackData = ctx.callbackQuery?.data;
  const telegramId = ctx.from.id;
  const userId = ctx.session.userId;
  const state = ctx.session.state;
  return {
    name,
    chatId,
    telegramId,
    message,
    callbackData,
    state,
    userId,
  };
}