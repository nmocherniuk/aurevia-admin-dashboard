import { Router } from "express";
import { requirePublicBookingKey } from "../middleware/requirePublicBookingKey.js";
import { validateBody } from "../middleware/validateBody.js";
import { validateParams } from "../middleware/validateParams.js";
import { validateQuery } from "../middleware/validateQuery.js";
import {
  publicBookingIdParamsSchema,
  publicCreateBookingSchema,
} from "../modules/booking/booking.schemas.js";
import {
  createPublicBookingController,
  getPublicBookingByIdController,
} from "../modules/booking/publicBooking.controller.js";
import {
  getPaymentBookingController,
  createPaymentIntentController,
} from "../modules/booking/publicPayment.controller.js";
import { publicPricingQuoteController } from "../modules/pricing/pricing.controller.js";
import { publicPricingQuoteQuerySchema } from "../modules/pricing/pricing.schemas.js";

const router = Router();

router.get(
  "/pricing/quote",
  validateQuery(publicPricingQuoteQuerySchema),
  publicPricingQuoteController,
);

router.get(
  "/bookings/:bookingId",
  validateParams(publicBookingIdParamsSchema),
  getPublicBookingByIdController,
);

router.post(
  "/bookings",
  requirePublicBookingKey,
  validateBody(publicCreateBookingSchema),
  createPublicBookingController,
);

router.get("/security-payment/:token", getPaymentBookingController);
router.post("/security-payment/:token/create-intent", createPaymentIntentController);

export default router;
