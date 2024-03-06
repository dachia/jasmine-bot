import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
// Derived class
export class ProfileModel extends BaseModel {
  constructor({ personaDescription, weight, gender, height, birthDate, steps, activityLevel, estimatedBurnPerDay, ...baseProps}) {
    super(baseProps); // Call to the base class constructor
    this.data.personaDescription = personaDescription;
    this.data.weight = weight
    this.data.birthDate = birthDate
    this.data.gender = gender
    this.data.height = height
    this.data.steps = steps
    this.data.activityLevel = activityLevel
    this.data.estimatedBurnPerDay = estimatedBurnPerDay
    createBaseClassGettersAndSetters(this)
  }
  
  get age() {
    return new Date().getFullYear() - this.data.birthDate.getFullYear();
  }
}