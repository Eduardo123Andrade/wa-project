import * as Yup from 'yup';
import { Messages } from '../../utils/v1';
import { ExamType } from './../../utils/v1';
import { ArrayOfIdsShape } from './../shape/ArrayOfIds.shape';

const minimumValueOfArray = 1;

export const validateCreateExamData = Yup.object().shape({
    name: Yup.string().required(Messages.Validate.NAME_IS_REQUIRED),
    laboratoriesIds: ArrayOfIdsShape
        .required(Messages.Validate.LIST_OF_ID_IS_REQUIRED)
        .min(minimumValueOfArray, Messages.Validate.STATUS_IS_REQUIRED),
    type: Yup.mixed<ExamType>()
        .oneOf(Object.values(ExamType), Messages.Validate.INVALID_EXAM_TYPE)
        .required(Messages.Validate.EXAM_TYPE_IS_REQUIRED),
})

export const validateCreateExamsData = Yup.object().shape({
    exams: Yup.array().of(validateCreateExamData).required(Messages.Validate.LIST_OF_EXAMS_IS_REQUIRED)
})