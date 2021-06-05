import { Router } from 'express';
import SwaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './../../config';


export const router = Router()

router.use("/doc", SwaggerUi.serve, SwaggerUi.setup(swaggerConfig))