export default {
  TELEGRAM_API_TOKEN: process.env.TELEGRAM_API_TOKEN,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI_TEST: process.env.MONGODB_URI_TEST ?? "mongodb://localhost:27017/test-db",
  OPENAI_ORG_ID: process.env.OPENAI_ORG_ID,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET ?? "test-secret",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
}