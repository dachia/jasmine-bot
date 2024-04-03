import { UserModel } from '../domain/userModel.mjs';
import { helloEmailTemplate, helloEmailTemplateText, sendMail } from '../services/sendMail.mjs';
import config from '../config.mjs';

export class SignupUseCase {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute({ id, email, password, timezone }) {
    const userExists = await this.userRepo.getByEmail(email);
    if (userExists) {
      throw new Error('User already exists');
    }
    const user = new UserModel({ id, email, timezone }, { isNew: true });
    await user.setPassword(password);
    await this.userRepo.save(user);
    const tgLink = `${config.TELEGRAM_BOT_ENDPOINT}?start=${user?.userId}`
    await sendMail({ to: email, subject: 'Welcome', text: helloEmailTemplateText(tgLink), html: helloEmailTemplate(tgLink)})
    return user
  }
}
