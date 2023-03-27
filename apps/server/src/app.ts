/* eslint-disable react-hooks/rules-of-hooks */
import "reflect-metadata";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import router from "./routes";

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

export default app;
