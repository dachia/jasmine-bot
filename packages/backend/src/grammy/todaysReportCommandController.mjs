import { mapNutritionFactsCollectionToAsciiTable } from "../mappers/mapNutritionFactsCollectionToAsciiTable.mjs";
import { getDailyReportQueryInstance } from "../queries/getInstance.mjs";

export const todaysReportCommandController = async (ctx, client) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const report = await getDailyReportQueryInstance(client).execute({ userId: ctx.from.id, date })
  const text = mapNutritionFactsCollectionToAsciiTable(report.logs.asNutritionFactsCollection()).toString()
  ctx.reply(`<pre>${text}</pre>
calorie deficit: <b>${report.balance.calorieDeficit?.toFixed(2)}</b>
protein deficit: <b>${report.balance.proteinDeficit?.toFixed(2)}</b>
`, { parse_mode: "HTML" });
}