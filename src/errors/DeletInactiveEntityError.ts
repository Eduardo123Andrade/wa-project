import httpStatus from 'http-status';
import { Messages } from '../utils/v1';
import { CustomError } from './CustomError';

export class DeleteInactiveEntityError extends CustomError {
    message: string;

    constructor(message: string = Messages.Error.ENTITY_INACTIVATED) {
        super(Number(httpStatus.NOT_FOUND), message)
        this.message = message;
    }
}
