import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
import { AsciiTable3, AlignmentEnum } from 'ascii-table3';
// Derived class
export class NutritionFactsModel extends BaseModel {
  constructor({ protein, fat, carbohydrates, kcal, fiber, sugar, grams, date, input, itemName, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.protein = protein
    this.data.fat = fat
    this.data.carbohydrates = carbohydrates
    this.data.kcal = kcal
    this.data.fiber = fiber
    this.data.sugar = sugar
    this.data.grams = grams
    this.data.itemName = itemName || input

    createBaseClassGettersAndSetters(this)
  }
  // Heading names array
  static toHeadingNamesArray() {
    return [
      "Item",
      "Kcal",
      "Grams",
      "Protein",
      "Fat",
      "Carbohydrates",
      "Fiber",
      // "Sugar",
    ]
  }
  // Disply data as array 
  toArray() {
    return [
      this.data.itemName,
      this.data.kcal.toFixed(2),
      this.data.grams.toFixed(2),
      this.data.protein.toFixed(2),
      this.data.fat.toFixed(2),
      this.data.carbohydrates.toFixed(2),
      this.data.fiber.toFixed(2),
      // this.data.sugar.toFixed(2),
    ]
  }

}

export class NutritionFactsEtimationModel extends NutritionFactsModel {
  constructor({ portionSizeUnits, portionSize, ...baseProps }) {
    super(baseProps);

    this.data.portionSizeUnits = portionSizeUnits
    this.data.portionSize = portionSize

    createBaseClassGettersAndSetters(this)
  }

}
export class FoodLogModel extends BaseModel {
  constructor({ date, prompt, sessionId, totalNutritionFacts, perItemNutritionFacts, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.prompt = prompt
    this.data.sessionId = sessionId
    this.data.totalNutritionFacts = new NutritionFactsModel({ ...totalNutritionFacts, itemName: "Total", ...baseProps })
    this.data.perItemNutritionFacts = perItemNutritionFacts?.map(item => new NutritionFactsEtimationModel({ ...item, ...baseProps }))

    createBaseClassGettersAndSetters(this)
  }

  toASCII() {
    const table = new AsciiTable3()
      .setHeading(...NutritionFactsModel.toHeadingNamesArray())
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix([
        ...this.data.perItemNutritionFacts.map(item => item.toArray()), 
        this.data.totalNutritionFacts.toArray()
      ])
    return table.toString()
  }
}