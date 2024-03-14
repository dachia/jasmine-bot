import { getSignupUseCase } from "../useCases/getInstance.mjs";

export async function signupController(req, res, client) {
  try {
    const signupUseCase = getSignupUseCase(client)
    const { email, password } = req.body;
    const user = await signupUseCase.execute({ email, password });
    return res.json({ user });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}