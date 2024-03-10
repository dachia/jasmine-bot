import { AsciiTable3 } from "ascii-table3"

export function mapNutritionFactsCollectionToAsciiTable(nutritionFactsCollection) {
  const sum = nutritionFactsCollection.sum()
  const rowMatrix = [
    // ['Item', 'Protein', 'Fat', 'Carbohydrates', 'Kcal', 'Fiber', 'Sugar', 'Grams'],
    ...nutritionFactsCollection.map(nutritionFacts => [
      AsciiTable3.truncateString(nutritionFacts.shortName, 10),
      nutritionFacts.kcal.toFixed(2),
      nutritionFacts.grams.toFixed(2),
      nutritionFacts.protein.toFixed(2),
      // nutritionFacts.fat,
      // nutritionFacts.carbohydrates,
      // nutritionFacts.fiber,
      // nutritionFacts.sugar,
    ]),
    ['Total', sum?.kcal.toFixed(2) ?? 0, sum?.grams.toFixed(2) ?? 0, sum?.protein.toFixed(2) ?? 0]
  ]
  const table = new AsciiTable3()
  table.setHeading('Item', 'Kcal', 'G', 'Prot')
  table.addRowMatrix(rowMatrix)
  table.setAlignCenter(3)
  table.setStyle('none')
  return table
}