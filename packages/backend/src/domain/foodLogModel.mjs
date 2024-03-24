import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
export class ExtractedAmountModel extends BaseModel {
  constructor({ grams, type, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.grams = grams
    this.data.type = type
    createBaseClassGettersAndSetters(this)
  }
}
// Derived class
export class NutritionFactsModel extends BaseModel {
  constructor({ protein, fat, carbohydrates, kcal, fiber, sugar, grams, date, name, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.protein = protein
    this.data.fat = fat
    this.data.carbohydrates = carbohydrates
    this.data.kcal = kcal
    this.data.fiber = fiber
    this.data.sugar = sugar
    this.data.grams = grams
    this.data.name = name

    createBaseClassGettersAndSetters(this)
  }
  getPerGrams(grams) {
    const calcPerGrams = (value) => value * grams / this.data.grams
    return new NutritionFactsModel({
      protein: calcPerGrams(this.data.protein),
      fat: calcPerGrams(this.data.fat),
      carbohydrates: calcPerGrams(this.data.carbohydrates),
      kcal: calcPerGrams(this.data.kcal),
      fiber: calcPerGrams(this.data.fiber),
      sugar: calcPerGrams(this.data.sugar),
      grams,
      name: this.data.name,
    })
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

export class FoodChoices extends BaseModel {
  constructor({ food, amounts, facts, chosenAmountId, chosenFactId, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.food = food
    this.data.amounts = amounts.map(item => new ExtractedAmountModel({ ...item, ...baseProps }))
    this.data.facts = facts.map(item => new NutritionFactsModel({ ...item, ...baseProps }))
    this.data.chosenAmountId = chosenAmountId ?? this.data.amounts[0].id
    this.data.chosenFactId = chosenFactId ?? this.data.facts[0].id
    createBaseClassGettersAndSetters(this)
  }

  get nutritionFacts() {
    const fact = this.data.facts.find(item => item.id === this.data.chosenFactId)
    const amount = this.data.amounts.find(item => item.id === this.data.chosenAmountId)
    return fact.getPerGrams(amount.grams)
  }
}
export class FoodLogModel extends BaseModel {
  constructor({ date, prompt, sessionId, foodChoices, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.prompt = prompt
    this.data.sessionId = sessionId
    this.data.date = date
    this.data.foodChoices = foodChoices?.map(item => new FoodChoices({ ...item, ...baseProps }))

    createBaseClassGettersAndSetters(this)
  }
  
  get perItemNutritionFacts() {
    return new NutritionFactsCollection(...this.data.foodChoices.map(item => item.nutritionFacts))
  }

  get totalNutritionFacts() {
    return this.perItemNutritionFacts.sum()
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