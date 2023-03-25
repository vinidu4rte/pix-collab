import Router from "@koa/router";
import { ChargeController } from "./modules/webhook/ChargeController";

const router = new Router();

router.post("/webhook/charge", ChargeController);

export default router;
