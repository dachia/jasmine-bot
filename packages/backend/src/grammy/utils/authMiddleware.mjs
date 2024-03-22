import { UserRepo } from "../../repos/userRepo.mjs";
import { extractGrammyCtxData } from "../../utils/extractGrammyCtxData.mjs";
import config from "../../config.mjs";

export async function authMiddleware(ctx, client, next) {
  const userRepo = new UserRepo(client);
  if (!ctx.session) {
    ctx.session = {};
  }
  if (!ctx.session?.userId) {
    const { telegramId } = extractGrammyCtxData(ctx)
    const user = await userRepo.getByAccountId(telegramId);
    if (user == null) {
      await ctx.reply(`Sign up in <a href="${config.FRONTEND_URL}">${config.FRONTEND_URL}</a> to start using the bot`, { parse_mode: "HTML" });
      return
    }
    ctx.session.userId = user.id;
  }
  await next();
}