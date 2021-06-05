import * as Yup from 'yup';
import { Messages } from '../../utils/v1';
import { AddressShape } from '../shape';

export const validateCreateLaboratoryData = Yup.object().shape({
    name: Yup.string().required(Messages.Validate.NAME_IS_REQUIRED),
    address: AddressShape.required(Messages.Validate.ADDRESS_IS_REQUIRED)
})

export const validateCreateLaboratoriesData = Yup.object().shape({
    laboratories: Yup.array().of(validateCreateLaboratoryData)
        .required(Messages.Validate.LIST_OF_LABORATORY_IS_REQUIRED)
})