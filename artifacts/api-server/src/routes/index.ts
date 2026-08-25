import { Router, type IRouter } from "express";
import healthRouter from "./health";
import eventsRouter from "./events";
import instagramRouter from "./instagram";

const router: IRouter = Router();

router.use(healthRouter);
router.use(eventsRouter);
router.use(instagramRouter);

export default router;
