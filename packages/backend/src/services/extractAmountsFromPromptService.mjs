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
  'etc'
];
const foodAmountStr = {
  foods: [{
    input: "",
    quantity: 1,
    unitOfMeasurement: units.join("|"),
    // type: "extracted|estimated",
    // rangeOfPossibleWeightInGrams: [0],
  }]
}
export class ExtractAmountsFromPromptService extends BaseGPTService {
  constructor(client) {
    // 2. If portion units arent weight(grams, kg, etc), then it's estimated, if weight then extracted.
    super(client, {
      basePromps: [
        {
          role: 'system',
          content: `Act as a service to identify quantity and units of measurement from a meal prompt. Use common sense.
Return following JSON structure:
${JSON.stringify(foodAmountStr, null, 2)}
Step by step:
1. Extract food quantity into quantity attribute
2. Exract food unit of measurement into unitOfMeasurement attribute
3. If units aren't provided, do an educated guess based on the prompt context.`
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

  async execute({ prompt, allSpecificFoods }) {
    // let prompt_ = allSpecificFoods.map(food => `${prompt}(replace food name ${food.input} with ${food.food})`).join("\n")
    const uniqueInputs = allSpecificFoods.map(f => f.input).filter((v, i, a) => a.indexOf(v) === i)
    const resp = await this.executeGpt({ prompt: `${prompt}. Possible inputs: ${uniqueInputs.join(", ")}` })
    const amounts = resp.foods
    let error = false
    const foods = allSpecificFoods.map(f => {
      const foundAmount = amounts.find(a => a.input === f.input)
      if (!foundAmount) {
        error = true
        return 
      }
      return {
        inputFood: f.input,
        food: f.food,
        quantity: foundAmount.quantity,
        unitOfMeasurement: foundAmount.unitOfMeasurement
      }
    })
    if (error) {
      return null
    }
    return foods
  }
}