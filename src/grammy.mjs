import { Bot, Keyboard, session } from 'grammy';
import { getMentalChatUseCaseInstance, getUpdateProfileUseCaseInstance, getEstimatedBurnPerDayInstance, getLogFoodUseCaseInstance } from './useCases/getInstance.mjs';
import config from './config.mjs';
import { getNextState } from './utils/nextState.mjs';
import { DEFAULT_STATE, STATES_EDIT_PROFILE, STATES_LOG_FOOD } from './domain/states.mjs';
import yup from 'yup';

export function createBot() {
  return new Bot(config.TELEGRAM_API_TOKEN)
}

export function botContextToContext(ctx) {
  return {
    chatId: ctx.chat.id,
    from: ctx.from,
    message: ctx.message
  }
}

const stopSessionMessage = "Stop session"

const sessionKeyboard = new Keyboard().text(stopSessionMessage).oneTime().resized()
const numberSchema = yup.number().required().positive();
const birthDateSchema = yup.date().required();
const genderSchema = yup.string().oneOf(['male', 'female']).required();

export function registerBotCommandHandlers(bot, client) {
  const mentalChatUseCase = getMentalChatUseCaseInstance(client);
  const updateProfileUseCase = getUpdateProfileUseCaseInstance(client);
  const estimatedBurnPerDayUseCase = getEstimatedBurnPerDayInstance(client);
  const logFoodUseCase = getLogFoodUseCaseInstance(client);
  bot.use(session({}))
  bot.command('sad', (ctx) => {
    ctx.reply('Send me a sticker!')
  });
  bot.command('start', (ctx) => {
    ctx.reply("Hi. Let's gather get your biometric data so I can help you better.\nWhat is your birth date? (YYYY-MM-DD)")
    if (!ctx.session) {
      ctx.session = {};
    }

    ctx.session.state = getNextState(null, STATES_EDIT_PROFILE)
  })
  bot.on("message", async (ctx) => {
    if (!ctx.session) {
      ctx.session = {};
    }
    const state = ctx.session.state ?? DEFAULT_STATE;
    const keyboard = { reply_markup: sessionKeyboard }
    const name = ctx.from.first_name;
    const message = ctx.message.text;
    const userId = ctx.from.id;
    // if (!ctx.session) {
    //   ctx.session = { state: "waiting-for-mood" };

    //   ctx.reply(`Hello. Describe in one word how are you feeling, ${name}?`, { ...keyboard });
    //   return
    // }
    if (message === stopSessionMessage) {
      ctx.session = {};
      ctx.reply(`Good luck with your day, ${name}!`);
      return
    }
    switch (state) {
      case STATES_EDIT_PROFILE.WAITING_FOR_BIRTH_DATE:
        try {
          birthDateSchema.validateSync(message);
        } catch (error) {
          ctx.reply("Invalid date format. Please use YYYY-MM-DD")
          return
        }
        ctx.session.profile = { birthDate: new Date(message) };
        ctx.session.state = getNextState(state, STATES_EDIT_PROFILE);
        ctx.reply("What is your weight in kg?");
        break;
      case STATES_EDIT_PROFILE.WAITING_FOR_WEIGHT:
        try {
          numberSchema.validateSync(message);
        } catch (error) {
          ctx.reply("Invalid number format. Please use a positive number")
          return
        }
        ctx.session.profile.weight = Number(message);
        ctx.session.state = getNextState(state, STATES_EDIT_PROFILE);
        ctx.reply("What is your height in cm?");
        break;
      case STATES_EDIT_PROFILE.WAITING_FOR_HEIGHT:
        try {
          numberSchema.validateSync(message);
        } catch (error) {
          ctx.reply("Invalid number format. Please use a positive number")
          return
        }
        ctx.session.profile.height = Number(message);
        ctx.session.state = getNextState(state, STATES_EDIT_PROFILE);
        ctx.reply("What is your gender?");
        break;
      case STATES_EDIT_PROFILE.WAITING_FOR_GENDER:
        try {
          genderSchema.validateSync(message);
        } catch (error) {
          ctx.reply("Invalid gender. Please choose one of male, female")
          return
        }
        ctx.session.profile.gender = message;
        ctx.session.state = getNextState(state, STATES_EDIT_PROFILE);
        ctx.reply("What is your activity level?");
        break;
      case STATES_EDIT_PROFILE.WAITING_FOR_ACTIVITY_LEVEL:
        ctx.session.profile.activityLevel = message;
        ctx.session.state = getNextState(state, STATES_EDIT_PROFILE);
        ctx.reply("How many steps do you take per day?");
        break;
      case STATES_EDIT_PROFILE.WAITING_FOR_STEPS:
        try {
          yup.number().validateSync(message);
        } catch (error) {
          console.error(error);
          ctx.reply("Invalid number format. Please use a positive number")
          return
        }

        ctx.session.profile.steps = message && Number(message);
        ctx.session.state = DEFAULT_STATE
        await updateProfileUseCase.execute({ userId, ...ctx.session.profile });
        const estimatedBurnPerDay = await estimatedBurnPerDayUseCase.execute({ userId });
        ctx.session.profile = {};
        ctx.reply(`Thank you for the information. I will use this to help you better.\nYour estimated burn per day is ${estimatedBurnPerDay.estimatedBurnPerDay}.`);
        break;
      case STATES_LOG_FOOD.WAITING_FOR_FOOD:
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const foodLog = await logFoodUseCase.execute({ userId, prompt: message, date });
        ctx.reply(`${foodLog}`)
        break;

    }
    // if (!ctx.session) {
    // }
    //   ctx.session = { state: "in-progress" };
    //   // ctx.session.mood = message;
    //   ctx.reply(`Hello. So what is bothering you, ${name}? Let me know how I can help you.`, { ...keyboard });
    //   return
    // }
    // if (ctx.session.state === "in-progress") {
    //   const state = ctx.session.mood;
    //   const sessionId = ctx.session.id ?? newId();
    //   ctx.replyWithChatAction('typing');
    //   const response = await mentalChatUseCase.processMessage({ sessionId, userId: ctx.from.id, message, state, name });
    //   ctx.reply(response, { ...keyboard });
    // }
  })
  // bot.on('sticker', (ctx) => ctx.reply('👍'));
}