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
export class ExtractMealInputFromPromptService extends BaseGPTService {
  constructor(client) {
    super(client, {
      basePromps: [
        {
          role: 'user',
          content: `
Extract meal information from the following text. Split the meal into separate foods if it consists of multiple dishes. Ensure the amounts are converted to grams or guessed based on context. If amounts are vague, like 'little' or 'big portions', guess the amounts based on averages. Return a boolean flag indicating if the amounts were originally in grams or were guessed. Use the most common variety of foods if the input is not precise enough. Provide the results in the following JSON structure:

\`\`\`json
{
  "meals": [
    {
      "food": "Food name",
      "amount": "Amount in grams",
      "guessed_amount": "Boolean indicating if the amount was guessed"
    }
  ]
}
\`\`\`

Here is the text: "{input text}"

---

Example input text:
"I had a big portion of spaghetti, a small apple, and some chicken breast for lunch."

Expected output JSON:
\`\`\`json
{
  "meals": [
    {
      "food": "spaghetti",
      "amount": 250,
      "guessed_amount": true
    },
    {
      "food": "apple",
      "amount": 100,
      "guessed_amount": true
    },
    {
      "food": "chicken breast",
      "amount": 150,
      "guessed_amount": true
    }
  ]
}
\`\`\`

Use this format for all future responses.`
        },
      ],
      opts: {
        model: "gpt-3.5-turbo",
      }
    })
  }

  async execute({ prompt }) {
    const resp = await this.executeGpt({ prompt: `
Please follow these instructions and return the result in the specified JSON structure.
${prompt}` })
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