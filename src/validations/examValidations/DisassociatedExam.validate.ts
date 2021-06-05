import * as Yup from 'yup';
import { Messages } from '../../utils/v1';


export const validateDisassociatedExamData = Yup.object().shape({
    examId: Yup.number().required(Messages.Validate.EXAM_ID_IS_REQUIRED),
    laboratoryId: Yup.number().required(Messages.Validate.LABORATORY_ID_IS_REQUIRED),
})