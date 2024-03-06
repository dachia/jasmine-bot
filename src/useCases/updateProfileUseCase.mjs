import { ProfileModel } from "../domain/profileModel.mjs";
import { setIfDefined } from "../utils/setIfDefined.mjs";

export class UpdateProfileUseCase {
  constructor(profileRepo) {
    this.profileRepo = profileRepo;
  }
  async execute({ userId, ...data }) {
    let profile = await this.profileRepo.getByUserId(userId);
    if (profile === null) {
      profile = new ProfileModel({ userId, ...data });
    } else {
      setIfDefined(profile, 'birthDate', data.birthDate);
      setIfDefined(profile, 'weight', data.weight);
      setIfDefined(profile, 'height', data.height);
      setIfDefined(profile, 'gender', data.gender);
      setIfDefined(profile, 'activityLevel', data.activityLevel);
      setIfDefined(profile, 'steps', data.steps);
    }
    await this.profileRepo.save(profile);
    return profile 
  }
}