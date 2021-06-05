import * as Yup from 'yup';
import { ExamType, Messages, Status } from './../../utils/v1';

export const validateUpdateExamData = Yup.object().shape({
    id: Yup.number().required(Messages.Validate.ID_IS_REQUIRED),
    name: Yup.string().required(Messages.Validate.NAME_IS_REQUIRED),

    status: Yup.mixed<Status>()
        .oneOf(Object.values(Status), Messages.Validate.INVALID_STATUS)
        .required(Messages.Validate.STATUS_IS_REQUIRED),

    type: Yup.mixed<ExamType>()
        .oneOf(Object.values(ExamType), Messages.Validate.INVALID_EXAM_TYPE)
        .required(Messages.Validate.EXAM_TYPE_IS_REQUIRED),
})

const dataToUpdateExamShape = Yup.object().shape({
    name: Yup.string().required(Messages.Validate.NAME_IS_REQUIRED),

    status: Yup.mixed<Status>()
        .oneOf(Object.values(Status), Messages.Validate.INVALID_STATUS)
        .required(Messages.Validate.STATUS_IS_REQUIRED),

    type: Yup.mixed<ExamType>()
        .oneOf(Object.values(ExamType), Messages.Validate.INVALID_EXAM_TYPE)
        .required(Messages.Validate.EXAM_TYPE_IS_REQUIRED),
})

export const validateUpdateExamsData = Yup.object().shape({
    exams: Yup.array().of(Yup.object().shape({
        id: Yup.number().required(Messages.Validate.ID_IS_REQUIRED),
        data: dataToUpdateExamShape.required(Messages.Validate.EXAM_DATA_IS_REQUIRED)

    })).required(Messages.Validate.LIST_OF_EXAMS_IS_REQUIRED)
})