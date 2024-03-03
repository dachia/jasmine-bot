import 'dotenv/config'
import { registerBotCommandHandlers, createBot } from './grammy.mjs';
const bot = createBot();
registerBotCommandHandlers(bot)
bot.start()