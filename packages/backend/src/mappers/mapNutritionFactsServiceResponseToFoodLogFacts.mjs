export function mapNutritionFactsServiceResponseToFoodLogFacts(res) {
  return res.map(r => new NutritionFactsModel(r))
}