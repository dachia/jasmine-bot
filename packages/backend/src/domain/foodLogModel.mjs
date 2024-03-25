import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
export const STATE_COMPLETED = 'completed'
export const STATE_PRE_PROMPT = 'pre-prompt'
export class ExtractedAmountModel extends BaseModel {
  constructor({ grams, name, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.grams = grams
    this.data.name = name
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
    this.data.amounts = amounts.map(item => item instanceof BaseModel ? item : new ExtractedAmountModel({ ...baseProps, ...item }))
    this.data.facts = facts.map(item => item instanceof BaseModel ? item : new NutritionFactsModel({ ...baseProps, ...item }))
    this.data.chosenAmountId = chosenAmountId ?? this.data.amounts?.[0]?.id
    this.data.chosenFactId = chosenFactId ?? this.data.facts?.[0]?.id
    createBaseClassGettersAndSetters(this)
  }
  get chosenFacts() {
    return this.data.facts.find(item => item.id === this.data.chosenFactId)
  }
  get chosenAmounts() {
    return this.data.amounts.find(item => item.id === this.data.chosenAmountId)
  }

  get nutritionFacts() {
    const fact = this.chosenFacts
    const amount = this.chosenAmounts
    const perGrams = fact.getPerGrams(amount.grams)
    perGrams.name = this.data.food
    return perGrams
  }
}
export class FoodLogModel extends BaseModel {
  constructor({ date, prompt, sessionId, foodChoices, state, ...baseProps }) {
    super(baseProps); // Call to the base class constructor
    this.data.prompt = prompt
    this.data.sessionId = sessionId
    this.data.date = date
    this.data.foodChoices = foodChoices?.map(item => item instanceof BaseModel ? item : new FoodChoices({ ...baseProps, ...item }))
    this.data.state = state ?? STATE_PRE_PROMPT

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