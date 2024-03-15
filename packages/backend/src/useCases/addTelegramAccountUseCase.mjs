export class AddTelegramAccountUseCase {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute({ userId, accountId}) {
    const user = await this.userRepo.getById(userId);
    if (!user) {
      throw new Error('User doesn\'t exists');
    }
    user.addAccount({ accountType: 'telegram', accountId })
    await this.userRepo.save(user);
    return user
  }
}
