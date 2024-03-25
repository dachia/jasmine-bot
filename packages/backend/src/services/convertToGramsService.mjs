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
          content: `Act as a service to convert food quantities to grams. Include ranges for non-standard units (like stalks or sizes) and exact values for standard units.
Use average weights for non-standard sizes and exact conversions for others.
`
        },
      ],
      opts: {
        model: "gpt-3.5-turbo",
      }
    })
  }

  async execute({ amounts }) {
    const prompt = JSON.stringify(amounts.filter(i => i.unitOfMeasurement !== 'g').map(a => ({
      food: a.food,
      quantity: 1,
      unitOfMeasurement: a.unitOfMeasurement
    })), null, 2)
    const resp = await this.executeGpt({ prompt })
    return resp.foods
  }
}