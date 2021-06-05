import { AddressShape } from './Address.shape';
import { Messages, Status } from './../../utils/v1';
import * as Yup from 'yup'

export const dataToUpdateLaboratoryShape = Yup.object().shape({
    name: Yup.string().required(Messages.Validate.NAME_IS_REQUIRED),
    address: AddressShape,

    status: Yup.mixed<Status>()
        .oneOf(Object.values(Status), Messages.Validate.INVALID_STATUS)
        .required(Messages.Validate.STATUS_IS_REQUIRED),
})
