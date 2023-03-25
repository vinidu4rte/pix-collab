import http from "http";
import { koaMiddleware } from "@as-integrations/koa";
import app from "./app";
import { createSchema } from "./schema";
import { connectDatabase } from "./config/database";
import { createGqlServer } from "./config/gqlServer";

async function bootstrap(): Promise<void> {
  try {
    await connectDatabase();
  } catch (err) {
    console.error("Unable to connect to database!", err);
    process.exit(1);
  }

  const httpServer = http.createServer(app.callback());
  const schema = await createSchema();
  const gqlServer = await createGqlServer(httpServer, schema);

  await gqlServer.start();
  app.use(koaMiddleware(gqlServer));
  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000`);
  });
}

bootstrap();
