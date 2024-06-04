import { BaseGPTService } from "./utils/baseGptService.mjs"

const foodAmountStr = {
  foods: [{
    food: "",
    grams: [0]
  }]
}
export class ConvertToGramsService extends BaseGPTService {
  constructor(client) {
    super(client, {
      jsonStructure: foodAmountStr,
      basePromps: [
        {
          role: 'system',
          content: `
Given the following list of foods with their respective units, estimate the weight in grams for each single unit of food and return the list with the estimated weight in grams for each food. If the unit is vague (e.g., "bit," "little"), make a reasonable assumption for the weight in grams.
Return following JSON:
{
  "foods": [
    {
      "food": string,
      "grams_in_unit": number
    },
    ...
  ]
}

Example:
**Input:**

\`\`\`json
{
  "foods": [
    {
      "food": "oatmeal",
      "unit": "grams"
    },
    {
      "food": "barhi date",
      "unit": "quantity"
    },
    {
      "food": "low fat milk",
      "unit": "grams"
    },
    {
      "food": "peanut butter",
      "unit": "bit"
    },
    {
      "food": "honey",
      "unit": "little"
    }
  ]
}
\`\`\`

**Output:**

\`\`\`json
{
  "foods": [
    {
      "food": "oatmeal",
      "grams_in_unit": 1
    },
    {
      "food": "barhi date",
      "grams_in_unit": 7
    },
    {
      "food": "low fat milk",
      "grams_in_unit": 1
    },
    {
      "food": "peanut butter",
      "grams_in_unit": 5
    },
    {
      "food": "honey",
      "grams_in_unit": 4
    }
  ]
}
\`\`\`

Please estimate the weight in grams for each food item in the list. For foods measured in grams, the value should be 1 gram. For foods measured in quantity, provide an average estimated weight in grams per single unit. For vague units, provide a reasonable estimate based on common usage.

`
        },
      ],
      opts: {
        model: "gpt-3.5-turbo",
      }
    })
  }

  async execute({ foods }) {
    const amounts = foods.map(f => ({ food: f.most_popular_variety, unit: f.parsed_amount_unit }))
    const resp = await this.executeGpt({ prompt: JSON.stringify({ foods: amounts }) })
    return resp.foods
  }
}