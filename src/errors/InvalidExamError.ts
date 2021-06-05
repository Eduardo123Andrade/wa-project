import httpStatus from 'http-status';
import { Messages } from './../utils/v1';
import { CustomError } from './CustomError';

export class InvalidExamError extends CustomError {
    constructor(message: string = Messages.Error.INVALID_EXAMS) {
        super(Number(httpStatus.FORBIDDEN), message);
        this.message = message;
    }

}