import { getUpdateUserUseCaseInstance } from "../useCases/getInstance.mjs";

export async function updateCurrentUserController(req, res, client) {
  try {
    const updateUserUseCase = getUpdateUserUseCaseInstance(client)
    const { userId } = req.ctx;
    const { timezone } = req.body;
    const user = await updateUserUseCase.execute({ userId, timezone });
    return res.json({ user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}