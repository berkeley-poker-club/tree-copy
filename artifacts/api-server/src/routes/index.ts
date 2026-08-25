import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import eventsRouter from "./events.js";
import instagramRouter from "./instagram.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(eventsRouter);
router.use(instagramRouter);

export default router;
