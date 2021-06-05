import { Router } from "express";
import { router as routerExam } from './exam.router';
import { router as routerLaboratory } from './laboratory.router';
import { router as routerDoc } from './doc.router'

export const router = Router();

router.use('/v1', routerLaboratory)
router.use('/v1', routerExam)
router.use('/v1', routerDoc)