import { BaseGPTService } from "./utils/baseGptService.mjs"

const foodAmountStr = {
  foods: [{
    food: "",
    grams: [0]
  }]
}
export class ConvertToGramsService extends BaseGPTService {
  constructor(client) {
// 2. If portion units arent weight(grams, kg, etc), then it's estimated, if weight then extracted.
    super(client, {
      jsonStructure: foodAmountStr,
      basePromps: [
        {
          role: 'system',
          content: `
Convert food quantities to grams. Include ranges for non-standard units (like stalks or sizes) and exact values for standard units.

Use average weights for non-standard sizes and exact conversions for others.
`
          //
// 
// Input:
// 
// 2 stalks celery, 1 medium steak, 1 cup milk
// 
// Expected Output:
// 
// json
// Copy code
// [
//   {"food": "celery", "grams": [80, 100]},
//   {"food": "steak", "grams": [150, 250]},
//   {"food": "milk", "grams": [240]}
// ]
//           content: `
// Process the prompt and extract information about food amounts and provide data to convert it to grams.
// Step by step:
// 1. Get portion units and amount in units from prompt. Guess if not directly provided.
// 2. Provide grams in single portion size unit. If multiple portion size units are possible, provide all of them.
// `
        },
      ],
      opts: {
        model: "gpt-3.5-turbo",
      }
    })
  }

  async execute({ amounts }) {
    const resp = await this.executeGpt({ prompt: amounts.filter(i => i.unitOfMeasurement !== 'g').map(i => `1 ${i.unitOfMeasurement} ${i.food}`).join(". ")})
    return resp.foods
  }
}