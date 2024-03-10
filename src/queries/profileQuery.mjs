export class ProfileQuery {
  constructor(profileRepo) {
    this.profileRepo = profileRepo;
  }
  
  async execute({ userId }) {
    const profile = await this.profileRepo.getById(userId);
    return profile
  }
}