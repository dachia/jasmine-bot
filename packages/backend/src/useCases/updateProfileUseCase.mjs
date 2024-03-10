import { ProfileModel } from "../domain/profileModel.mjs";
import { setIfDefined } from "../utils/setIfDefined.mjs";
import { ProfileStatsLogModel } from "../domain/profileStatsLogModel.mjs";

export class UpdateProfileUseCase {
  constructor(profileRepo, profileStatsLogRepo) {
    this.profileRepo = profileRepo;
    this.profileStatsLogRepo = profileStatsLogRepo;
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
    if (data.activityLevel != null || data.steps != null || data.weight != null) {
      const profileStatsLog = new ProfileStatsLogModel({ userId, ...data });
      await this.profileStatsLogRepo.save(profileStatsLog);
    }
    await this.profileRepo.save(profile);
    return profile
  }
}