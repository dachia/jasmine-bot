import config from "./config.mjs";
import { buildExpressApp } from "./express.mjs";

export function startExpress(client) {
  const app = buildExpressApp(client);
  app.listen(config.PORT, () => {
    console.log(`App listening at http://localhost:${config.PORT}`);
  });
  return app;
}