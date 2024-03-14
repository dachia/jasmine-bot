import { getUserQueryInstance } from "../queries/getInstance.mjs";

export async function userQueryController(req, res, client) {
  try {
    const userQuery = getUserQueryInstance(client)
    const user = await userQuery.execute({ id: req.ctx.userId });
    return res.json({ user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}