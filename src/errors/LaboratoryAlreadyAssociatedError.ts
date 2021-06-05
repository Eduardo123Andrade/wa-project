import { Messages } from '../utils/v1';
import httpStatus from 'http-status';
import { CustomError } from './CustomError';

export class LaboratoryAlreadyAssociatedError extends CustomError {
    message: string

    constructor(message: string = Messages.Error.LABORATORY_ALREADY_ASSOCIATED) {
        super(Number(httpStatus.FORBIDDEN), message)
        this.message = message
    }
}