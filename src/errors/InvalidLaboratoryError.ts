import httpStatus from 'http-status';
import { Messages } from '../utils/v1/ConstantsMessages';
import { CustomError } from './CustomError';

export class InvalidLaboratoryError extends CustomError {
    message: string;

    constructor(message: string = Messages.Error.INVALID_LABORATORIES) {
        super(Number(httpStatus.FORBIDDEN), message);
        this.message = message;
    }
}
