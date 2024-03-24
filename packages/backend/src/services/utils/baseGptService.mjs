import { parseFirstJson } from "../../utils/parseFirstJson.mjs"

export class BaseGPTService {
  client
  opts
  jsonStructure
  basePromps
  constructor(client, { opts, jsonStructure, basePromps }) {
    this.client = client
    this.opts = opts
    this.jsonStructure = jsonStructure
    this.basePromps = basePromps
  }

  async executeGpt({ prompt }) {
    const gptResponse = await this.client.processPrompt(
      [
        ...this.basePromps,
        ...(this.jsonStructure == null ? [] : [{
          role: 'system',
          content: `Respond with following json structure: ${JSON.stringify(this.jsonStructure)}`
        }]),
        {
          role: 'user',
          content: `${prompt}`,
        },
      ],
      {
        model: "gpt-3.5-turbo",
      }
    )
    const parsedGptResponse = parseFirstJson(gptResponse.choices[0].message.content);
    if (!parsedGptResponse) return null

    return parsedGptResponse
  }
  
  async execute({ prompt }) {
    return await this.executeGpt({ prompt })
  }
}