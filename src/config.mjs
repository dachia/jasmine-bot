export default {
  TELEGRAM_API_TOKEN: process.env.TELEGRAM_API_TOKEN,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI_TEST: process.env.MONGODB_URI_TEST ?? "mongodb://localhost:27017/test-db",
  OPENAI_ORG_ID: process.env.OPENAI_ORG_ID,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PORT: process.env.PORT ?? 3000
}