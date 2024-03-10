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


export const processStateController = async (ctx, client) => {
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
      const estimatedBurnPerDay = await estimatedBurnPerDayUseCase.execute({ userId });
      ctx.reply(`Your estimated burn per day is ${estimatedBurnPerDay.estimatedBurnPerDay}.`);
      break;
    case WAITING_FOR_FOOD:
      await logFoodController(ctx, client);
      break;
    case WAITING_FOR_MENTAL_INPUT:
      await sendMentalChatMessageController(ctx, client);
      break;
    case ACTIVITY_LEVEL_GREETING:
      ctx.reply("What is your activity level?", {
        reply_markup: new InlineKeyboard()
          .text("Skip", "skip-state")
        // .text("Sedentary")
        // .text("Lightly active")
        // .text("Moderately active")
        // .text("Very active")
        // .text("Extra active")
      });
      break
    case BIRTH_DATE_GREETING:
      ctx.reply("What is your birth date? (YYYY-MM-DD)");
      break
    case MENTAL_INPUT_GREETING:
      ctx.reply(`Hello. So what is bothering you, ${name}? Let me know how I can help you.`);
      break
    case FOOD_INPUT_GREETING:
      ctx.reply("Message me the food you ate")
      break
    case WEIGHT_GREETING:
      ctx.reply("What is your weight in kg?");
      break;
    case HEIGHT_GREETING:
      ctx.reply("What is your height in cm?");
      break
    case GENDER_GREETING:
      ctx.reply("What is your gender?", { reply_markup: new InlineKeyboard().text(GENDER_MALE.name, GENDER_MALE.value).text(GENDER_FEMAIL.name, GENDER_FEMAIL.value) });
      break;
    case STEPS_GREETING:
      ctx.reply("How many steps do you take per day?", { reply_markup: new InlineKeyboard().text("Skip", "skip-state") });
      break
    default:
      return;
  }
}