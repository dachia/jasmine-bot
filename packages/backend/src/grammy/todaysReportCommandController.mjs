import { mapNumberToDisplay } from "../mappers/mapNumberToDisplay.mjs";
import { mapNutritionFactsCollectionToAsciiTable } from "../mappers/mapNutritionFactsCollectionToAsciiTable.mjs";
import { getDailyReportQueryInstance } from "../queries/getInstance.mjs";
import { translationService } from "../services/singletones.mjs";
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";

export const todaysReportCommandController = async (ctx, client) => {
  const trans = translationService.getTranslationsInstance(ctx)
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const { userId } = extractGrammyCtxData(ctx)
  const report = await getDailyReportQueryInstance(client).execute({ userId, date })
  const text = mapNutritionFactsCollectionToAsciiTable(report.logs.asNutritionFactsCollection(), trans).toString()
  await ctx.reply(`<pre>${text}</pre>
${trans.t("food_log.total_calories_consumed")}: <i>${mapNumberToDisplay(report.computed.total?.kcal)}</i>
${trans.t("food_log.total_calories_left")}: <b>${mapNumberToDisplay(report.computed.calorieDeficit)}</b>
${trans.t("food_log.total_protein_consumed")}: <i>${mapNumberToDisplay(report.computed.total?.protein)}</i>
${trans.t("food_log.total_fat_consumed")}: <i>${mapNumberToDisplay(report.computed.total?.fat)}</i>
${trans.t("food_log.total_carbohydrates_consumed")}: <i>${mapNumberToDisplay(report.computed.total?.carbohydrates)}</i>
`, { parse_mode: "HTML" });
}