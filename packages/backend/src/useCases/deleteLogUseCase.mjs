export class DeleteLogUseCase {
  constructor(foodLogRepo) {
    this.foodLogRepo = foodLogRepo;
  }
  async execute({ userId, id }) {
    await this.foodLogRepo.remove({ userId, id });
  }
}
