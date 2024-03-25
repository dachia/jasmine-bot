import { BaseGPTService } from "./utils/baseGptService.mjs"

const foodItemsStructure = {
  foods: [{
    // generalTerm: "string",
    // moreSpecificFood: "string|null",
    food: "string",
    fullNameMostPopularVariety: "string",
    // type: "general term|specific variety",
    // variations: ["string"]
  }]
}
export class ExtractFoodItemsFromPromptService extends BaseGPTService {
  constructor(client) {
    super(client, {
      basePromps: [
        {
          role: 'system',
          content: `Act as a nutritionist to identify all foods from a meal prompt that will later be used to query nutrition facts.
Find full name most popular food to enchance food prompt. Use your expertise as nutritionist.
json response: ${JSON.stringify(foodItemsStructure, null, 2)}
          `
          
          
          
//           `Act as nutritionist to identify food items from a meal prompt.
// If food item isn't specific too get nutrition facts, provide most popular specific food. Use common sense.
// Return json response ${JSON.stringify(foodItemsStructure)}
// `
// step by step:
// 1. Parse the user input to extract parts of meal if they make sense to be separate in the context of meal.
// 2. specificVarietyFoodName can either be part of meal or most popular variety that makes sense in context of meal.
// 4. for each identify best context fitting specific variety of food or meal.
// 3. For each generate a list of the most popular of specific variaties of each food item.

          //
// `Given the following meal, please perform two tasks. First, identify and list each and every food item separately. Then, for each food item, research and provide a list of the most popular variations that are possible in context of prompt meal.
//           `
          // content: `Split prompt into smallest possible separate foods. All foods in the prompt must be present. Do not include amounts`
        },
      ],
      opts: {
        model: "gpt-3.5-turbo",
      }
    })
  }

  async execute({ prompt }) {
    const resp = await this.executeGpt({ prompt })
    const foods = []
    for (const food of resp.foods) {
      // const variations = []
      // if (food.specificVarietyFoodName) {
      //   variations.push(food.specificVarietyFoodName)
      // }
      // variations.push(...food.variations)
      foods.push({
        generalTerm: food.food,
        inputFood: food.food,
        variations: [food.fullNameMostPopularVariety ?? food.food]
      })
    }
    return foods
  }
}