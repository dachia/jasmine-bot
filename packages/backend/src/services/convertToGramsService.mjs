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
Act as a service to convert food amounts to grams. Use your expertise as a nutritionist.
Your tasks are:
1. Estimate and convert food amounts to grams, including vague units such as "a bit" or "some."

Input is JSON in the following format:
\`\`\`json
{
  "foods": [
    {
      "food": "oatmeal",
      "unit": "grams",
      "amount": 1
    },
    {
      "food": "barhi date",
      "unit": "quantity",
      "amount": 1
    },
    {
      "food": "low fat milk",
      "unit": "grams",
      "amount": 1
    }
  ]
}
\`\`\`

Output should be in the following format:
\`\`\`json
{
  "foods": [
    {
      "food": "oatmeal",
      "grams": 1
    },
    {
      "food": "barhi date",
      "grams": 7
    },
    {
      "food": "low fat milk",
      "grams": 1
    }
  ]
}
\`\`\`

### Example:

#### Input:
\`\`\`json
{
  "foods": [
    {
      "food": "fried lean beef",
      "unit": "a bit",
      "amount": 1
    },
    {
      "food": "onion",
      "unit": "a bit",
      "amount": 1
    },
    {
      "food": "cauliflower",
      "unit": "a bit",
      "amount": 1
    },
    {
      "food": "nut",
      "unit": "some",
      "amount": 1
    }
  ]
}
\`\`\`

#### Output:
\`\`\`json
{
  "foods": [
    {
      "food": "fried lean beef",
      "grams": 50
    },
    {
      "food": "onion",
      "grams": 30
    },
    {
      "food": "cauliflower",
      "grams": 40
    },
    {
      "food": "nut",
      "grams": 15
    }
  ]
}
\`\`\`

### Notes:

1. Ensure that vague units such as "a bit" or "some" are converted to grams using common sense and nutritional expertise.
2. Provide accurate and reasonable estimates for the weight in grams for each food item based on typical serving sizes.
3. Use reliable sources and nutritional knowledge to inform your estimates.
`
        },
      ],
      opts: {
        model: "gpt-3.5-turbo",
      }
    })
  }

  async execute({ foods }) {
    const amounts = foods.map(f => ({ food: f.most_popular_variety, unit: f.parsed_amount_unit, amount: 1 }))
    const resp = await this.executeGpt({ prompt: JSON.stringify({ foods: amounts }) })
    return resp.foods
  }
}