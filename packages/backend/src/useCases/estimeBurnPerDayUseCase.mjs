// import { FoodLogModel } from "../domain/foodLogModel.mjs";
// import { ChatSessionModel } from "../domain/chatSessionModel.mjs";

export class EstimateBurnPerDayUseCase {
  constructor(estimatedBurnPerDayService, profileRepo, chatRepo) {
    this.estimatedBurnPerDayService = estimatedBurnPerDayService;
    this.profileRepo = profileRepo;
    this.chatRepo = chatRepo;
  }
  async execute({ userId }) {
    // const session = new ChatSessionModel({ userId, problemStatement: prompt });
    // session.addMessage({ content: prompt, role: 'user' });

    const profile = await this.profileRepo.getByUserId(userId);
    const estimatedBurn = await this.estimatedBurnPerDayService.getEstimatedBurnPerDay({ profile });
    // session.addMessage({ content: "", role: 'assistant', rawResponse: nutritionInfo});
    // const foodLog = new FoodLogModel({ userId, prompt, ...nutritionInfo, date, sessionId: session.id});
    profile.estimatedBurnPerDay = estimatedBurn.estimatedBurnPerDay;
    await this.profileRepo.save(profile);
    // await this.chatRepo.save(session);
    return estimatedBurn
  }
}