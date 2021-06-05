import httpStatus from 'http-status';
import { Messages } from '../utils/v1/ConstantsMessages';
import { CustomError } from './CustomError';

export class DeleteInactivatedLaboratoryError extends CustomError {
    message: string;

    constructor(message: string = Messages.Error.CANT_DELETE_INACTIVE_LABORATORY) {
        super(Number(httpStatus.FORBIDDEN), message);
        this.message = message;
    }
}
