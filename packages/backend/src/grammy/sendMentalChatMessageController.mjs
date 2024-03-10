import { getMentalChatUseCaseInstance } from '../useCases/getInstance.mjs';
import { extractGrammyCtxData } from "../utils/extractGrammyCtxData.mjs";
import { newId } from '../utils/genId.mjs';


export async function sendMentalChatMessageController(ctx, client) {
  const mentalChatUseCase = getMentalChatUseCaseInstance(client);
  const { message, userId, name } = extractGrammyCtxData(ctx);
  ctx.replyWithChatAction('typing');
  ctx.session.id = ctx.session.id ?? newId();
  const response = await mentalChatUseCase.processMessage({ sessionId: ctx.session.id, userId, message, name });
  ctx.reply(response);
}