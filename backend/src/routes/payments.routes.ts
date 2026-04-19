import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { listPaymentsController } from "../modules/payments/payments.controller.js";

const router = Router();

router.get("/", requireAuth, listPaymentsController);

export default router;
