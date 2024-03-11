import { AsciiTable3 } from "ascii-table3"
import { mapNumberToDisplay } from "./mapNumberToDisplay.mjs"

export function mapNutritionFactsRowToDisplayArray(nutritionFact) {
  return [
    mapNumberToDisplay(nutritionFact?.kcal),
    // mapNumberToDisplay(nutritionFact.grams),
    mapNumberToDisplay(nutritionFact?.protein),
    mapNumberToDisplay(nutritionFact?.fat),
    mapNumberToDisplay(nutritionFact?.carbohydrates),
    // mapNumberToDisplay(nutritionFact.fiber),
    // mapNumberToDisplay(nutritionFact.sugar),
  ]
}

export function mapNutritionFactsCollectionToAsciiTable(nutritionFactsCollection) {
  const sum = nutritionFactsCollection.sum()
  const rowMatrix = [
    ...nutritionFactsCollection.map(nutritionFacts => [
      AsciiTable3.truncateString(nutritionFacts.shortName, 8),
      ...mapNutritionFactsRowToDisplayArray(nutritionFacts)
    ]),
    ['Total', ...mapNutritionFactsRowToDisplayArray(sum)]
  ]
  const table = new AsciiTable3()
  table.setHeading('', 'Kcal', 'Pr', 'Ft', 'Cb')
  table.addRowMatrix(rowMatrix)
  // table.setAlignCenter(3)
  table.setStyle('none')
  return table
}