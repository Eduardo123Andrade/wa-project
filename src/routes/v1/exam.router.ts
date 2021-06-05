import { Router } from 'express';
import { ExamController } from '../../controllers/v1';
import { validateData } from '../../middlewares/validate';
import {
    validateAssociateExamData,
    validateCreateExamsData,
    validateDeleteExamsData, validateDisassociatedExamData,
    validateUpdateExamsData
} from '../../validations/examValidations';


export const router = Router()

router.post('/create-exams', validateData(validateCreateExamsData), ExamController.createExams)

router.put('/update-exams',validateData(validateUpdateExamsData), ExamController.updateExams)
router.put('/associate-the-exam-with-a-laboratory', validateData(validateAssociateExamData), ExamController.associateExamWithLaboratory)
router.put('/disassociate-a-laboratory-from-an-exam', validateData(validateDisassociatedExamData), ExamController.disassociateALaboratoryFromAnExam)

router.delete('/delete-exams', validateData(validateDeleteExamsData), ExamController.deleteExams)

router.get('/get-laboratories-by-exam-name/:examName', ExamController.getLaboratoryByExamName)
router.get('/list-activated-exam', ExamController.getActiveExams)