import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
// Derived class
export class ProfileStatsLogModel extends BaseModel {
  constructor({ weight, steps, activityLevel, ...baseProps}) {
    super(baseProps); // Call to the base class constructor
    this.data.weight = weight
    this.data.steps = steps
    this.data.activityLevel = activityLevel
    createBaseClassGettersAndSetters(this)
  }
  
  get recommendedProtein() {
    return this.weight;
  }
}