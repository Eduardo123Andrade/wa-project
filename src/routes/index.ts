import { Router } from "express";
import { router as routerV1 } from "./v1/index";

export const router = Router();

router.use(routerV1);
