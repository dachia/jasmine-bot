import { getFoodFactsRoutine } from './utils/getFoodFactsRoutine.mjs';

export const confirmLogCommandController = async (ctx, client, id) => {
  await getFoodFactsRoutine(ctx, client, id);
}