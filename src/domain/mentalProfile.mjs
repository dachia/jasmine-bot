import { BaseModel } from './baseModel.mjs';
// Derived class
export class MentalProfileModel extends BaseModel {
  constructor({ personaDescription, ...baseProps}) {
    super(baseProps); // Call to the base class constructor
    this.personaDescription = personaDescription;
  }
}