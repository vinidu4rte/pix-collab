import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line turbo/no-undeclared-env-vars
const { NODE_ENV, PORT, MONGO_URI, WOOVI_API_KEY, WOOVI_WEBHOOK_SECRET } =
  process.env;

export const config = {
  NODE_ENV,
  PORT: PORT || 4000,
  MONGO_URI,
  WOOVI_API_KEY,
  WOOVI_WEBHOOK_SECRET,
};
