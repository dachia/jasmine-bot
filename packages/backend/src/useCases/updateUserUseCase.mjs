export class UpdateUserUseCase {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute({ userId, timezone}) {
    const user = await this.userRepo.getById(userId);
    if (!user) {
      throw new Error('User doesn\'t exist');
    }
    user.timezone = timezone
    await this.userRepo.save(user)
    return user
  }
}
