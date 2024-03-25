import { BaseGPTService } from "./utils/baseGptService.mjs"
const foodDataFacts = {
  protein: 0,
  fat: 0,
  carbohydrates: 0,
  kcal: 0,
  fiber: 0,
  sugar: 0,
  grams: 0,
  name: "",
}
const nustritionFactsStructure = {
  results: [{
    input: "",
    foodDataFactsMatches: [foodDataFacts]
  }]
}

export class NutritionFactsGPTService extends BaseGPTService {
  constructor(client) {
    super(client, {
      jsonStructure: nustritionFactsStructure,
      basePromps: [
        {
          role: 'system',
//           content: `
// Given a list of food names separated by commas, your task is to find detailed nutritional data for each food item from the USDA's FoodData Central database. When searching for each food item, if there are multiple matches in the database, return information for 3 matching most popular entries based on commonality in diets or frequency of consumption
//           `
          // content: `You are USDA FoodData Central. Per input food find matches in the database and return nutrition facts for each match.`
          content: `Act as nutrition fact service. Return nutrition facts per 100g for each food item in the list.`
        },
      ],
      opts: {
        model: "gpt-3.5-turbo",
      }
    })
  }

  async execute({ foods }) {
    const res = await this.executeGpt({ prompt: foods.join(", ") })
    return res.results
  }
}