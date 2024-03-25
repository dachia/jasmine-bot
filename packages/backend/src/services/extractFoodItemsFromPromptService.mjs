import { BaseGPTService } from "./utils/baseGptService.mjs"

const foodItemsStructure = {
  foods: [{
    generalTerm: "string",
    specificVarietyFoodName: "string|null",
    exactInputWithoutAmounts: "string",
    type: "general term|specific variety",
    variations: ["string"]
  }]
}
export class ExtractFoodItemsFromPromptService extends BaseGPTService {
  constructor(client) {
    super(client, {
      basePromps: [
        {
          role: 'system',
          content: `Act as a service to extrat foods and specific varieties from a promp. The prompt is a meal description. Be precise. 
Return json response ${JSON.stringify(foodItemsStructure)}
step by step:
1. Parse the user input to extract every food. All foods in the prompt must be present.
2. Identify if the food item is a general term or a specific variety.
3. specificVarietyFoodName is the full name of the food when specific variety.
4. For each get the most popular varieties of each food item. Must fit the context of the prompt.
`
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
      const variations = []
      if (food.specificVarietyFoodName) {
        variations.push(food.specificVarietyFoodName)
      }
      variations.push(...food.variations)
      foods.push({
        generalTerm: food.generalTerm,
        inputFood: food.exactInputWithoutAmounts,
        variations
      })
    }
    return foods
  }
}