import { authService } from '../../services/singletones.mjs';
export async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const body = await authService.verify(token ?? "");
    if (!body) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.ctx = { userId: body.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}