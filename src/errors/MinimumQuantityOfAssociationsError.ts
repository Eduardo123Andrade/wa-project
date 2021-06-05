import httpStatus from 'http-status';
import { Messages } from '../utils/v1';
import { CustomError } from './CustomError';

export class MinimumQuantityOfAssociationsError extends CustomError {
    constructor(message: string = Messages.Error.MINIMUM_QUANTITY_OF_LABORATORY_ASSOCIATIONS) {
        super(Number(httpStatus.FORBIDDEN), message)
    }
}