import { parseFirstJson } from "../utils/parseFirstJson.mjs"
const nutritionFacts = {
  protein: 0,
  fat: 0,
  carbohydrates: 0,
  kcal: 0,
  fiber: 0,
  sugar: 0,
  grams: 0,
  input: "",
  itemName: "",
  shortName: "",
}
const nustritionFactsStructure = {
  results: [nutritionFacts]
}
const portionSizeStructure = {
  results: [{
    name: "",
    userPortionSizeInput: "",
    estimatedPortionSizeUnits: "",
    estimatedPortionSizeInGrams: 0
  }]
}
export class NutritionInfoService {
  client
  constructor(client) {
    this.client = client
  }

  async getNutritionInfo({ prompt }) {
    // When theres not precise weight, assume do your best educated guess.
    // If the prompt does not contain a weight information, assume average
    // Be precise, return only facts. Nutrition facts should be per 100g or standard portion size.

    // If user didn't provide precise weight in grams, estimate the weight in grams based on the prompt. If the prompt does not contain portion size information, assume average portion size.
    const portionSizeResponse = await this.client.processPrompt(
      [
        {
          role: 'system',
          content: `Act as a portion size processing from natural language service. 
Your role is to split input into foods and convert user input to grams.

Step by step:
1. Do an educated guess on user input units, which can be grams, pieces(if number provided assume pieces), cups, etc.
2. If not information about portion size, assume average portion size. If pieces are provided, assume average weight for that food multipled by pieces.
3. Convert portion size to grams
Respond with following json structure: ${JSON.stringify(portionSizeStructure)}`
        },
        //         {
        //           role: 'system',
        //           content: `Act as a food library, process user input and return matching formatted food name.
        // Respond with following json structure: ${JSON.stringify(foodNameLibraryStructure)}
        // `
        //         },
        {
          role: 'user',
          content: `${prompt}`,
        },
      ],
      {
        model: "gpt-3.5-turbo",
      }
    )
    const parsedPortionSize = parseFirstJson(portionSizeResponse.choices[0].message.content);
    if (!parsedPortionSize) return null

    const nutritionFactsResponse = await this.client.processPrompt(
      [
        {
          role: 'system',
          content: `Act as a nutrition facts service. Return food nutrition facts per 100g for each line of input.
Respond with following json structure: ${JSON.stringify(nustritionFactsStructure)}
`
        },
        {
          role: 'user',
          content: `${parsedPortionSize.results.map(p => p.name).join("\n")}`,
        },
      ],
      {
        model: "gpt-3.5-turbo",
        // response_format: undefined
      }
    )

    const parsedNutritionFacts = parseFirstJson(nutritionFactsResponse.choices[0].message.content);
    if (!parsedNutritionFacts) return null

    const nutritionFactsPerPortion = []
    for (const item of parsedNutritionFacts.results) {
      const portionSize = parsedPortionSize.results.find(p => p.name === item.input)
      const portionSizeG = portionSize.estimatedPortionSizeInGrams
      // calculate per portion
      nutritionFactsPerPortion.push(Object.fromEntries(
        [
          ...Object.entries(item).map(([key, value]) => {
            if (typeof value !== 'number') return [key, value]

            return [key, value * portionSizeG / item.grams]
          }),
          
          ["portionSizeUnits", portionSize.estimatedPortionSizeUnits],
          ["portionSize", portionSize.userPortionSizeInput]
        ]
      ))
    }
  
    const nutritionFactsTotal = nutritionFactsPerPortion.reduce((acc, item) => {
      for (const key of Object.keys(item)) {
        const value = item[key]
        if (typeof value !== 'number') {
          acc[key] = [acc[key], value].filter(i => !!i).join(", ")
        } else {
          acc[key] = (acc[key] ?? 0) + value
        }
      }
      return acc
    }, {})

    return {
      nutritionFactsPerPortion,
      nutritionFactsTotal
    }
  }
}