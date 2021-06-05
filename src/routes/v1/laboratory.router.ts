import { Router } from 'express';
import { validateData } from '../../middlewares/validate';
import { LaboratoryController } from './../../controllers/v1/';
import {
    validateCreateLaboratoriesData,
    validateDeleteLaboratoriesData,
    validateUpdateLaboratoriesData
} from './../../validations/laboratoryValidations';


export const router = Router()

router.post('/create-laboratories', validateData(validateCreateLaboratoriesData), LaboratoryController.createLaboratories)

router.put('/update-laboratories', validateData(validateUpdateLaboratoriesData), LaboratoryController.updateLaboratories)

router.delete('/delete-laboratories', validateData(validateDeleteLaboratoriesData), LaboratoryController.deleteLaboratories)

router.get('/list-activated-laboratory', LaboratoryController.getActivatedLaboratory)