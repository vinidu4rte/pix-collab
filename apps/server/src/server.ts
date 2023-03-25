import { connectDatabase } from "./config/database";

async function bootstrap() {
  try {
    await connectDatabase();
  } catch (err) {
    console.error("Unable to connect to database!", err);
    process.exit(1);
  }
}

bootstrap();
