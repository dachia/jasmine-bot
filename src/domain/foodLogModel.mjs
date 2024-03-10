import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
// Derived class
export class NutritionFactsModel extends BaseModel {
  constructor({ protein, fat, carbohydrates, kcal, fiber, sugar, grams, date, input, shortName, itemName, portionSize, portionSizeUnits, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.protein = protein
    this.data.fat = fat
    this.data.carbohydrates = carbohydrates
    this.data.kcal = kcal
    this.data.fiber = fiber
    this.data.sugar = sugar
    this.data.grams = grams
    this.data.itemName = itemName || input
    this.data.shortName = shortName || this.data.itemName
    this.data.portionSizeUnits = portionSizeUnits
    this.data.portionSize = portionSize

    createBaseClassGettersAndSetters(this)
  }
  add(other) {
    return new NutritionFactsModel({
      protein: this.data.protein + other.data.protein,
      fat: this.data.fat + other.data.fat,
      carbohydrates: this.data.carbohydrates + other.data.carbohydrates,
      kcal: this.data.kcal + other.data.kcal,
      fiber: this.data.fiber + other.data.fiber,
      sugar: this.data.sugar + other.data.sugar,
      grams: this.data.grams + other.data.grams,
      itemName: [this.data.itemName, other.data.itemName].join(' + ')
    })
  }
}

export class NutritionFactsCollection extends Array {
  sum() {
    let sum
    for (const item of this) {
      sum = sum ? sum.add(item) : item
    }
    return sum
  }
}
export class FoodLogModel extends BaseModel {
  constructor({ date, prompt, sessionId, totalNutritionFacts, perItemNutritionFacts, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.prompt = prompt
    this.data.sessionId = sessionId
    this.data.date = date
    this.data.totalNutritionFacts = new NutritionFactsModel({ ...totalNutritionFacts, itemName: "Total", ...baseProps })
    this.data.perItemNutritionFacts = new NutritionFactsCollection(...perItemNutritionFacts?.map(item => new NutritionFactsModel({ ...item, ...baseProps })))

    createBaseClassGettersAndSetters(this)
  }

  add() {
    return this.data.perItemNutritionFacts.sum()
  }
}

export class FoodLogModelCollection extends Array {
  sum() {
    let sum
    for (const item of this) {
      sum = sum ? sum.add(item) : item
    }
    return sum
  }

  asNutritionFactsCollection() {
    return new NutritionFactsCollection(...this.map(item => item.perItemNutritionFacts).flat())
  }
}