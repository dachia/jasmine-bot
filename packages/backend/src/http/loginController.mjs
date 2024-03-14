import { getLoginUseCase } from "../useCases/getInstance.mjs";

export async function loginController(req, res, client) {
  try {
    const loginUseCase = getLoginUseCase(client)
    const { email, password } = req.body;
    const token = await loginUseCase.execute({ email, password });
    return res.json({ token });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}