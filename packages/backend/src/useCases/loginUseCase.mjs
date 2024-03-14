export class LoginUseCase {
  constructor(userRepo, authService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  async execute({ email, password }) {
    const user = await this.userRepo.getByEmail(email);
    if (!user) {
      throw new Error('User doesn\'t exist');
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    const token = await this.authService.sign({ userId: user.id, email: user.email });
    return token
  }
}
