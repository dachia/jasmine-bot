import { getSignupUseCase } from "../useCases/getInstance.mjs";

export async function signupController(req, res, client) {
  try {
    const signupUseCase = getSignupUseCase(client)
    const { email, password, timezone } = req.body;
    const user = await signupUseCase.execute({ email, password, timezone});
    return res.json({ user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}