import { getDailyReportQueryInstance } from "../queries/getInstance.mjs";

export const todaysReportCommandController = async (ctx, client) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const report = await getDailyReportQueryInstance(client).execute({ userId: ctx.from.id, date })
  ctx.reply(`<pre>${report.toASCII()}</pre>`, { parse_mode: "HTML" });
}