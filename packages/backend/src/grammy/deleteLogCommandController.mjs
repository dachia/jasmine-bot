
import { getDeleteLogUseCaseInstance } from "../useCases/getInstance.mjs";

export const deleteLogCommandController = async (ctx, client, id) => {
  await getDeleteLogUseCaseInstance(client).execute({ userId: ctx.from.id, id})
  ctx.reply(`Log deleted`);
}