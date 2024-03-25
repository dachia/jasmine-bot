import { UserModel } from '../domain/userModel.mjs';
import { helloEmailTemplate, sendMail } from '../services/sendMail.mjs';
import config from '../config.mjs';

export class SignupUseCase {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute({ id, email, password }) {
    const userExists = await this.userRepo.getByEmail(email);
    if (userExists) {
      throw new Error('User already exists');
    }
    const user = new UserModel({ id, email }, { isNew: true });
    await user.setPassword(password);
    await this.userRepo.save(user);
    await sendMail({ to: email, subject: 'Welcome', html: helloEmailTemplate(`${config.TELEGRAM_BOT_ENDPOINT}?start=${user?.userId}`)})
    return user
  }
}
