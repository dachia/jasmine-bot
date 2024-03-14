import { UserModel } from '../domain/userModel.mjs';

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
    return user
  }
}
