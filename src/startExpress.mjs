import config from "./config.mjs";
import { creteExpressApp, registerExpressRoutes } from "./express.mjs";

export function startExpress() {
  const app = creteExpressApp();
  registerExpressRoutes(app);
  app.listen(config.PORT, () => {
    console.log(`App listening at http://localhost:${config.PORT}`);
  });
  return app;
}