import { BaseGPTService } from "./utils/baseGptService.mjs"

const units = [
  'g', // grams
  'kg', // kilograms
  'mg', // milligrams
  'oz', // ounces
  'lb', // pounds
  'tsp', // teaspoon
  'tbsp', // tablespoon
  'fl oz', // fluid ounces
  'cup', // cup
  'pt', // pint
  'qt', // quart
  'gal', // gallon
  'ml', // milliliters
  'l', // liters
  'dl', // deciliters
  'cl', // centiliters
  'mm', // millimeter (rarely used in cooking, more for packaging dimensions)
  'cm', // centimeter (rarely used in cooking, more for packaging dimensions)
  'm', // meter (very rarely used in cooking, more for packaging dimensions)
  'in', // inches (sometimes used in cooking for dimensions)
  'stick', // stick (often used for butter in the United States)
  'piece', // piece, when counting individual items
  'slice', // slice, for items that are commonly sliced
  'pinch', // pinch, for very small amounts of dry ingredients
  'dash', // dash, slightly more than a pinch
  'handful', // handful, not precise but used informally
  'bunch', // bunch, often used for herbs or vegetables
  'head', // head, typically for lettuce or garlic
  'clove', // clove, specifically for garlic
  'pod', // pod, for items like peas or vanilla
  'ear', // ear, for corn
  'can', // can, for canned goods
  'bottle', // bottle, for liquids like oil, vinegar, etc.
  'jar', // jar, for items like jam, pickles, etc.
  'packet', // packet, for small, pre-measured items
  'box', // box, for contained items like cereal
  'bag', // bag, for bagged items like flour or sugar
];
const foodAmountStr = {
  foods: [{
    food: "",
    quantity: 0,
    unitOfMeasurement: "",
    // type: "extracted|estimated",
    // rangeOfPossibleWeightInGrams: [0],
  }]
}
export class ExtractAmountsFromPromptService extends BaseGPTService {
  constructor(client) {
// 2. If portion units arent weight(grams, kg, etc), then it's estimated, if weight then extracted.
    super(client, {
      jsonStructure: foodAmountStr,
      basePromps: [
        {
          role: 'system',
          content: `Given meal prompt, and mapping between food names and parts of input with portion sizes, identify the unit of measurement, and the quantity.
Units of measurement can be, but not limited to ${units.join(", ")}`
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

  async execute({ allSpecificFoods }) {
    const prompt_ = allSpecificFoods.map(food => `${food.input} (replace with following food ${food.food})`).join("\n")
    const resp = await this.executeGpt({ prompt: prompt_  })
    return resp.foods
  }
}