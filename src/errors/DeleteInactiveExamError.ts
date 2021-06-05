import httpStatus from 'http-status';
import { Messages } from '../utils/v1/ConstantsMessages';
import { CustomError } from './CustomError';

export class DeleteInactiveExamError extends CustomError {
    message: string;

    constructor(message: string = Messages.Error.CANT_DELETE_INACTIVE_EXAM) {
        super(Number(httpStatus.FORBIDDEN), message);
        this.message = message;
    }
}
