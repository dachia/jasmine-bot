import { UserRepo } from "../../repos/userRepo.mjs";
import { extractGrammyCtxData } from "../../utils/extractGrammyCtxData.mjs";
export async function authMiddleware(ctx, client, next) {
  const userRepo = new UserRepo(client);
  if (!ctx.session) {
    ctx.session = {};
  }
  if (!ctx.session?.userId) {
    const { telegramId } = extractGrammyCtxData(ctx)
    const user = await userRepo.getByAccountId(telegramId);
    if (user == null) {
      ctx.reply("You are not authorized to use this bot. Please contact the bot owner to get access.")
      return
    }
    ctx.session.userId = user.id;
  }
  await next();
}