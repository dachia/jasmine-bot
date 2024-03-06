
const structure = {
  estimatedBurnPerDay: 0,
}
export class EstimatedBurnPerDayService {
  client
  constructor(client) {
    this.client = client
  }

  async getEstimatedBurnPerDay({ profile }) {
    const age = profile.age
    const weight = profile.weight
    const height = profile.height
    const activityLevel = profile.activityLevel ?? "unknown"
    const steps = profile.steps ?? "unknown"
    const gender = profile.gender
    const prompt = `age: ${age}, weight: ${weight}, height: ${height}, gender: ${gender}, activity level: ${activityLevel}, steps: ${steps}`
    const response = await this.client.processPrompt(
      [
        {
          role: 'system',
          content: `Act as a service that processes user age, gender, activity level and/or steps and returns estimated kcal burned per day. 

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