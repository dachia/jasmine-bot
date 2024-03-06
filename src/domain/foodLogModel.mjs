import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
// Derived class
export class FoodLogModel extends BaseModel {
  constructor({ protein, fat, carbs, calories, fiber, sugar, grams, date, mealName, prompt, sessionId, ingredients, ...baseProps}) {
    super(baseProps); // Call to the base class constructor
    this.data.protein = protein
    this.data.fat = fat
    this.data.carbs = carbs
    this.data.calories = calories
    this.data.fiber = fiber
    this.data.sugar = sugar
    this.data.grams = grams
    this.data.date = date
    this.data.mealName = mealName
    this.data.prompt = prompt
    this.data.sessionId = sessionId
    this.data.ingredients = ingredients
    
    createBaseClassGettersAndSetters(this)
  }
  
  // Return nutrition information for the food log
  toString() {
    return `Protein: ${this.data.protein}, Fat: ${this.data.fat}, Carbs: ${this.data.carbs}, Calories: ${this.data.calories}, Fiber: ${this.data.fiber}, Sugar: ${this.data.sugar}, Grams: ${this.data.grams}, Meal Name: ${this.data.mealName}, Ingredients: ${JSON.stringify(this.data.ingredients)}`
  }
}