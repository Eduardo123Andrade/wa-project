import * as Yup from 'yup';
import { AddressShape,dataToUpdateLaboratoryShape } from '../shape';
import { Messages, Status } from './../../utils/v1';

export const validateUpdateLaboratoryData = Yup.object().shape({
    id: Yup.number().required(Messages.Validate.ID_IS_REQUIRED),
    name: Yup.string().required(Messages.Validate.NAME_IS_REQUIRED),
    address: AddressShape,

    status: Yup.mixed<Status>()
        .oneOf(Object.values(Status), Messages.Validate.INVALID_STATUS)
        .required(Messages.Validate.STATUS_IS_REQUIRED),

})


export const validateUpdateLaboratoriesData = Yup.object().shape({
    laboratories: Yup.array().of(Yup.object().shape({
        id: Yup.number().required(Messages.Validate.ID_IS_REQUIRED),
        data: dataToUpdateLaboratoryShape.required(Messages.Validate.LABORATORY_DATA_IS_REQUIRED)

    })).required(Messages.Validate.LIST_OF_LABORATORY_IS_REQUIRED)
})