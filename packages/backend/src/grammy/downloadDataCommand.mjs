import { FoodLogRepo } from "../repos/foodLogRepo.mjs";
import { InputFile } from "grammy";
import { stringify } from 'csv-stringify';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { translationService } from "../services/singletones.mjs";
export async function downloadDataCommand(ctx, client) {
  const trans = translationService.getTranslationsInstance(ctx)
  const { userId } = extractGrammyCtxData(ctx);
  const foodLogRepo = new FoodLogRepo(client);
  const logs = await foodLogRepo.find({ userId });
  const items = logs.asNutritionFactsCollection()

  const dataMatrix = [[
    "creteatedAt",
    "shortName",
    "itemName",
    "portionSizeUnits",
    "portionSize",
    "grams",
    "kcal",
    "protein",
    "carbohydrates",
    "fat",
    "fiber",
    "sugar"]
    , ...items.map(log => {
      return [
        log.createdAt.toISOString(),
        log.shortName,
        log.itemName,
        log.portionSizeUnits,
        log.portionSize,
        log.grams,
        log.kcal,
        log.protein,
        log.carbohydrates,
        log.fat,
        log.fiber,
        log.sugar,
      ]
    })]
  stringify(dataMatrix, (err, output) => {
    if (err) {
      ctx.reply(trans.t("export.error_generating_csv"));
      return;
    }

    // Send the CSV data as a message
    ctx.replyWithDocument(new InputFile(Buffer.from(output), `jasmine-export.csv` ));
  });
}