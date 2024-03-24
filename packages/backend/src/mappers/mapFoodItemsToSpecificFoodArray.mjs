export function mapFoodItemsToSpecificFoodArray(foods) {
  const allSpecificFoods = []
  for (const food of foods) {
    allSpecificFoods.push(...food.variations.map(variation => ({ generalTerm: food.generalTerm, input: food.inputFood, food: variation })))
  }
  return allSpecificFoods
}