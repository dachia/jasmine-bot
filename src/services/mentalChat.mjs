// content: `You are a licensed therapist who practices cognitive-behavioral therapy to help patients reach, maintain, and accept their desired weight. I am your patient. This is our first meeting. Let's begin.`
const structure = {
  message: "",
  actionableItems: [],
  questions: [],
  summary: ""
}
export class MentalChat {
  client
  constructor(client) {
    this.client = client
  }
  async getTherapy({ state, name, session }) {
    const response = await this.client.processPrompt(
      [
        {
          role: 'system',
          content: `Act as a licensed therapist who practices cognitive-behavioral therapy to help patients to help them change their behavior. 

In each response you either ask question or give actionable items help user achieve his goal.

User is your patient. 

Be relatable, empathetic, but precise and to the point.

Respond with following json structure: ${JSON.stringify(structure)}
`
        },
        {
          role: 'user',
          content: `My name is ${name}`,
        },
        ...session.messages.map((message) => ({
          role: message.role,
          content: message.content
        }))
      ]
    )

    // console.log(response)
    // console.log(response.choices[0].message.content)
    return JSON.parse(response.choices[0].message.content);
  }
}