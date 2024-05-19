import { UserRepo } from "../../repos/userRepo.mjs";
import config from "../../config.mjs";

export async function subscriptionMiddleware(ctx, client, next) {
  const isOnTrial = ctx.session?.user?.data?.isTrial
    && ctx.session?.user?.data?.subscriptionEndAt != null
  const userRepo = new UserRepo(client);
  const user =ctx.session?.user 
  if (isOnTrial
    && user?.data?.subscriptionEndAt < new Date()
  ) {
    await ctx.reply(`Your trial has ended, please subscribe <a href="${config.FRONTEND_URL}">${config.FRONTEND_URL}</a> to continue using the bot`, { parse_mode: "HTML" });
    return
  }
  if (isOnTrial && !user?.data?.isNotifiedAboutTrialEnd) {
    user.data.isNotifiedAboutTrialEnd = true
    await userRepo.save(user)
    await ctx.reply(`---
Your trial will end soon, please subscribe <a href="${config.FRONTEND_URL}">${config.FRONTEND_URL}</a> to continue using the bot.
---`, { parse_mode: "HTML" });
  }
  await next();
}
