
// content: `You are a licensed therapist who practices cognitive-behavioral therapy to help patients reach, maintain, and accept their desired weight. I am your patient. This is our first meeting. Let's begin.`
const structure = {
  protein: 0,
  fat: 0,
  carbs: 0,
  calories: 0,
  fiber: 0,
  sugar: 0,
  grams: 0,
  ingredients: [],
  mealName: "",
}
export class NutritionInfoService {
  client
  constructor(client) {
    this.client = client
  }

  async getNutritionInfo({ prompt }) {
// When theres not precise weight, assume do your best educated guess.
    const response = await this.client.processPrompt(
      [
        {
          role: 'system',
          content: `Act as a nutrition service that processes user prompt and returns nutrition information for the whole meal. 

If the prompt does not contain a weight information, assume average

Respond with following json structure: ${JSON.stringify(structure)}
`
        },
        {
          role: 'user',
          content: prompt,
        },
      ]
    )

    // console.log(response)
    // console.log(response.choices[0].message.content)
    return JSON.parse(response.choices[0].message.content);
  }
}