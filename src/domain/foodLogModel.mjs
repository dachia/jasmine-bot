import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
// Derived class
export class FoodLogModel extends BaseModel {
  constructor({ protein, fat, carbs, calories, fiber, sugar, grams, date, mealName, ...baseProps}) {
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
    
    createBaseClassGettersAndSetters(this)
  }
}