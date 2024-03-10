import { AsciiTable3 } from "ascii-table3"

export function mapNutritionFactsCollectionToAsciiTable(nutritionFactsCollection) {
  const sum = nutritionFactsCollection.sum()
  const rowMatrix = [
    // ['Item', 'Protein', 'Fat', 'Carbohydrates', 'Kcal', 'Fiber', 'Sugar', 'Grams'],
    ...nutritionFactsCollection.map(nutritionFacts => [
      AsciiTable3.truncateString(nutritionFacts.itemName, 8),
      nutritionFacts.kcal,
      nutritionFacts.grams,
      nutritionFacts.protein,
      // nutritionFacts.fat,
      // nutritionFacts.carbohydrates,
      // nutritionFacts.fiber,
      // nutritionFacts.sugar,
    ]),
    ['Total', sum.kcal, sum.grams, sum.protein]
  ]
  const table = new AsciiTable3()
  table.setHeading('Item', 'Kcal', 'Grams', 'Protein')
  table.addRowMatrix(rowMatrix)
  table.setAlignCenter(3)
  table.setStyle('none')
  return table
}