import { mapNumberToDisplay } from "./mapNumberToDisplay.mjs"

export function mapFoodLogToConfirmResponse(foodLog, trans) {
  const message = foodLog.foodChoices.map((foodChoice) => {
    const amounts = foodChoice.chosenAmounts
    return `${mapNumberToDisplay(amounts.grams)}g ${amounts.name}`
  })
  return message.join("\n")
}