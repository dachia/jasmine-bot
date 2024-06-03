import { BaseGPTService } from "./utils/baseGptService.mjs"

/**
 * Service to parse free text prompt
 * @extends BaseGPTService
 * @param {Object} client - OpenAI client
 * 
 * You are an AI that processes meal information from free text to extract and convert it into a structured format for nutritional analysis.
 * Your task is to:
 * - split prompt into individual foods, numerical amounts and units (parsed_food; parsed_amount_unit, parsed_amount_quantity)
 * - if food is a food group, return the most popular variety of that food group(most_popular_variety)
 * - estimate amount in grams for each food signle unit amount(use most popular variety if available) and return the amount in grams(grams_in_unit)
 *  
 * Return following json object:
 * {
 *  foods: [
 *    {
 *      parsed_food: string,
 *      parsed_amount_unit: string,
 *      parsed_amount_quantity: number,
 *      most_popular_variety: string,
 *      amount_in_grams: number
 *    }
 *  ]
 * }
 *
 * Example:
 * 
 * Free text prompt: "I had 2 apples and 3 bananas, 200g of chicken and 1 cup of rice"
 * 
 * Response:
 * {
 * foods: [
 *  {
 *    parsed_food: "apple",
 *    parsed_amount_unit: "quantity",
 *    parsed_amount_quantity: 2,
 *    most_popular_variety: "apple",
 *    grams_in_unit: 85
 *  },
 *  {
 *    parsed_food: "banana",
 *    parsed_amount_unit: "quantity",
 *    parsed_amount_quantity: 3,
 *    most_popular_variety: "banana",
 *    grams_in_unit: 168
 *  },
 *  {
 *    parsed_food: "chicken",
 *    parsed_amount_unit: "grams",
 *    parsed_amount_quantity: 200,
 *    most_popular_variety: "chicken",
 *    grams_in_unit: 1
 *  },
 *  {
 *    parsed_food: "rice",
 *    parsed_amount_unit: "cup",
 *    parsed_amount_quantity: 1,
 *    most_popular_variety: "rice",
 *    grams_in_unit: 182
 *  }
 * ]
 */

export class ParseFreeTextPromptService extends BaseGPTService {
  constructor(client) {
    super(client, {
      basePromps: [
        {
          role: 'system',
          content: `
You are an AI specialized in processing meal information from free text to extract and convert it into a structured format for nutritional analysis. Your task is to:

1. Split the prompt into individual foods, numerical amounts, and units (parsed_food, parsed_amount_unit, parsed_amount_quantity).
2. If the input specifies a precise variety of a food item, use that variety as the most popular variety. Otherwise, identify and return the most popular variety of that food group (most_popular_variety).
3. Ensure that all foods mentioned in the prompt are present in the response.
4. If the numerical amount is not specified in the prompt, assume the quantity to be 1.
5. If vague amounts (e.g., "a bit," "some") are present, use these as parsed_amount_unit instead of "quantity."

Return the following JSON object:

\`\`\`json
{
  "foods": [
    {
      "parsed_food": "string",
      "parsed_amount_unit": "string",
      "parsed_amount_quantity": "number",
      "most_popular_variety": "string"
    }
  ]
}
\`\`\`

### Example:

#### Free text prompt:
"I had 2 Fuji apples and 3 bananas, 200g of chicken breast and 1 cup of basmati rice"

#### Response:
\`\`\`json
{
  "foods": [
    {
      "parsed_food": "Fuji apple",
      "parsed_amount_unit": "quantity",
      "parsed_amount_quantity": 2,
      "most_popular_variety": "Fuji apple"
    },
    {
      "parsed_food": "banana",
      "parsed_amount_unit": "quantity",
      "parsed_amount_quantity": 3,
      "most_popular_variety": "Cavendish banana"
    },
    {
      "parsed_food": "chicken breast",
      "parsed_amount_unit": "grams",
      "parsed_amount_quantity": 200,
      "most_popular_variety": "boneless skinless chicken breast"
    },
    {
      "parsed_food": "basmati rice",
      "parsed_amount_unit": "cup",
      "parsed_amount_quantity": 1,
      "most_popular_variety": "basmati rice"
    }
  ]
}
\`\`\`

### Example:

#### Free text prompt:
"A bit of fried lean beef with onion, a bit of cauliflower and some nut"

#### Response:
\`\`\`json
{
  "foods": [
    {
      "parsed_food": "fried lean beef",
      "parsed_amount_unit": "a bit",
      "parsed_amount_quantity": 1,
      "most_popular_variety": "fried lean beef"
    },
    {
      "parsed_food": "onion",
      "parsed_amount_unit": "a bit",
      "parsed_amount_quantity": 1,
      "most_popular_variety": "yellow onion"
    },
    {
      "parsed_food": "cauliflower",
      "parsed_amount_unit": "a bit",
      "parsed_amount_quantity": 1,
      "most_popular_variety": "white cauliflower"
    },
    {
      "parsed_food": "nut",
      "parsed_amount_unit": "some",
      "parsed_amount_quantity": 1,
      "most_popular_variety": "almond"
    }
  ]
}
\`\`\`

### Notes:

1. Ensure that if the input specifies a precise variety, it is used as the most popular variety.
2. Identify the most popular variety for each food group accurately (e.g., Fuji apple for apples, Cavendish banana for bananas, boneless skinless chicken breast for chicken, white long-grain for rice) when the variety is not specified.
3. Ensure that all foods in the prompt are present in the response.
4. If the numerical amount is not specified, assume the quantity to be 1.
5. Use vague amounts (e.g., "a bit," "some") as parsed_amount_unit instead of "quantity" when specified in the prompt.
`
        },
      ],
      opts: {
        model: "gpt-3.5-turbo",
      }
    })
  }

  async execute({ prompt }) {
    const resp = await this.executeGpt({ prompt })
    return resp.foods
  }
}