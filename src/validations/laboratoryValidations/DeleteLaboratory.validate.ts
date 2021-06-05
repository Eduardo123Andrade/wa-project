import { Messages } from '../../utils/v1'
import * as Yup from 'yup'

export const validateDeleteLaboratoryData = Yup.object().shape({
    id: Yup.number().required(Messages.Validate.ID_IS_REQUIRED)
})

export const validateDeleteLaboratoriesData = Yup.object().shape({
    laboratoriesId: Yup.array().of(Yup.number())
        .min(1, Messages.Validate.INVALID_MINIMUM_LENGTH_OF_LIST)
        .required(Messages.Validate.LIST_OF_ID_IS_REQUIRED)
})