export class UserQuery {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute({ id }) {
    const user = await this.userRepo.getById(id);
    delete user.data.hashedPassword;
    return user
  }
}
