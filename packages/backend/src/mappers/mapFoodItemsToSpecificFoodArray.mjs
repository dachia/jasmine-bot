export function mapFoodItemsToSpecificFoodArray(foods) {
  const allSpecificFoods = []
  for (const food of foods) {
    const variation = food.variations[0]
    allSpecificFoods.push({ generalTerm: food.generalTerm, input: food.inputFood, food: variation })
    // allSpecificFoods.push(...food.variations.map(variation => ({ generalTerm: food.generalTerm, input: food.inputFood, food: variation })))
  }
  return allSpecificFoods
}