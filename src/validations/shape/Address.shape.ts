import { Messages } from './../../utils/v1/ConstantsMessages';
import * as Yup from 'yup';

export const AddressShape = Yup.object().shape({
    number: Yup.string().required(Messages.Validate.NUMBER_IS_REQUIRED),
    street: Yup.string().required(Messages.Validate.STREET_IS_REQUIRED),
    neighborhood: Yup.string().required(Messages.Validate.NEIGHBORHOOD_IS_REQUIRED),
    city: Yup.string().required(Messages.Validate.CITY_IS_REQUIRED),
    state: Yup.string().required(Messages.Validate.STATE_IS_REQUIRED),
    postalCode: Yup.string().required(Messages.Validate.POSTAL_CODE_IS_REQUIRED),
})