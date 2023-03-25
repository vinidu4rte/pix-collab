/* eslint-disable react-hooks/rules-of-hooks */
import "reflect-metadata";
import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

export default app;
