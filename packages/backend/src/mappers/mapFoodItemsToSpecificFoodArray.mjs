export function mapFoodItemsToSpecificFoodArray(foods) {
  const allSpecificFoods = []
  for (const food of foods) {
    if (food.specificVariety) {
      allSpecificFoods.push({ input: food.inputTerm, food: food.specificVariety })
    }
    allSpecificFoods.push(...food.variations.map(variation => ({ input: food.inputTerm, food: variation })))
  }
  return allSpecificFoods
}