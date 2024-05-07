import config from "../../config.mjs";

export async function subscriptionMiddleware(ctx, client, next) {
  if (ctx.session?.user?.data?.isTrial
    && ctx.session?.user?.data?.subscriptionEndAt != null
    && ctx.session?.user?.data?.subscriptionEndAt < new Date()
  ) {
    await ctx.reply(`Your trial has ended, please subscribe <a href="${config.FRONTEND_URL}">${config.FRONTEND_URL}</a> to continue using the bot`, { parse_mode: "HTML" });
    return
  }
  await next();
}
