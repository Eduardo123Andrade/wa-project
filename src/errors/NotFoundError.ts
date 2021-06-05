import httpStatus from 'http-status';
import { Messages } from '../utils/v1';
import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
    message: string;

    constructor(message: string = Messages.Error.ENTITY_NOT_FOUNDED) {
        super(Number(httpStatus.NOT_FOUND), message)
        this.message = message;
    }
}
