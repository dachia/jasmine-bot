import { getEstimatedBurnPerDayInstance } from '../useCases/getInstance.mjs';
import { chooseGenderController } from './chooseGenderController.mjs';
import { extractGrammyCtxData } from '../utils/extractGrammyCtxData.mjs';
import { setBirthDateController } from './setBirthDateController.mjs';
import { setWeightController } from './setWeightController.mjs';
import { setHeightController } from './setHeightController.mjs';
import { setActivityLevelController } from './setActivityLevelController.mjs';
import { setStepsController } from './setStepsController.mjs';
import { logFoodController } from './logFoodController.mjs';
import { sendMentalChatMessageController } from './sendMentalChatMessageController.mjs';
import {
  WAITING_FOR_BIRTH_DATE,
  WAITING_FOR_WEIGHT,
  WAITING_FOR_HEIGHT,
  WAITING_FOR_GENDER,
  WAITING_FOR_ACTIVITY_LEVEL,
  WAITING_FOR_STEPS,
  ESTIMATE_BURN_PER_DAY,
  WAITING_FOR_FOOD,
  WAITING_FOR_MENTAL_INPUT,
  ACTIVITY_LEVEL_GREETING, BIRTH_DATE_GREETING, MENTAL_INPUT_GREETING, FOOD_INPUT_GREETING, WEIGHT_GREETING, HEIGHT_GREETING, GENDER_GREETING, STEPS_GREETING
} from '../domain/states.mjs';
import { InlineKeyboard } from "grammy";
import { GENDER_FEMAIL, GENDER_MALE } from "../domain/genders.mjs";
import { translationService } from "../services/singletones.mjs";


export const processStateController = async (ctx, client) => {
  const trans = translationService.getTranslationsInstance(ctx)
  const estimatedBurnPerDayUseCase = getEstimatedBurnPerDayInstance(client);
  const { userId, state, name } = extractGrammyCtxData(ctx);
  switch (state) {
    case WAITING_FOR_BIRTH_DATE:
      await setBirthDateController(ctx, client);
      break;
    case WAITING_FOR_WEIGHT:
      await setWeightController(ctx, client);
      break;
    case WAITING_FOR_HEIGHT:
      await setHeightController(ctx, client);
      break;
    case WAITING_FOR_GENDER:
      await chooseGenderController(ctx, client);
      break;
    case WAITING_FOR_ACTIVITY_LEVEL:
      await setActivityLevelController(ctx, client);
      break;
    case WAITING_FOR_STEPS:
      await setStepsController(ctx, client);
      break;
    case ESTIMATE_BURN_PER_DAY:
      ctx.replyWithChatAction('typing');
      await estimatedBurnPerDayUseCase.execute({ userId });
      const profile = await estimatedBurnPerDayUseCase.execute({ userId });
      await ctx.reply(trans.t("profile.estimated_tdd_explanation", {
        kcal: profile.estimatedBurnPerDay,
        weight: profile.weight,
      }));
      break;
    case WAITING_FOR_FOOD:
      await logFoodController(ctx, client);
      break;
    case WAITING_FOR_MENTAL_INPUT:
      await sendMentalChatMessageController(ctx, client);
      break;
    case ACTIVITY_LEVEL_GREETING:
      await ctx.reply(trans.t("profile.activity_level_question"), {
        reply_markup: new InlineKeyboard()
          .text(trans.t("general.skip_button"), "skip-state")
        // .text("Sedentary")
        // .text("Lightly active")
        // .text("Moderately active")
        // .text("Very active")
        // .text("Extra active")
      });
      break
    case BIRTH_DATE_GREETING:
      await ctx.reply(trans.t("profile.birth_date_question"));
      break
    case MENTAL_INPUT_GREETING:
      await ctx.reply(trans.t("mental.greeting_question", { name }));
      break
    case FOOD_INPUT_GREETING:
      await ctx.reply(trans.t("food_log.greeting_question"));
      break
    case WEIGHT_GREETING:
      await ctx.reply(trans.t("profile.weight_question"));
      break;
    case HEIGHT_GREETING:
      await ctx.reply(trans.t("profile.height_question"));
      break
    case GENDER_GREETING:
      await ctx.reply(trans.t("profile.gender_question"), { reply_markup: new InlineKeyboard().text(GENDER_MALE.name, GENDER_MALE.value).text(GENDER_FEMAIL.name, GENDER_FEMAIL.value) });
      break;
    case STEPS_GREETING:
      await ctx.reply(trans.t("profile.steps_question"), { reply_markup: new InlineKeyboard().text(trans.t("general.skip_button"), "skip-state") });
      break
    default:
      return;
  }
}