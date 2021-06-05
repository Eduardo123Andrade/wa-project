import httpStatus from 'http-status';
import { Messages } from '../utils/v1';
import { CustomError } from './CustomError';

export class InactiveEntityError extends CustomError {
    message: string;

    constructor(message: string = Messages.Error.ENTITY_INACTIVATED) {
        super(Number(httpStatus.FORBIDDEN), message)
        this.message = message;
    }
}
