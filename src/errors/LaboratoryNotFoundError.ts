import { Messages } from '../utils/v1/ConstantsMessages';
import { NotFoundError } from './NotFoundError';

export class LaboratoryNotFoundError extends NotFoundError {
    message: string;

    constructor(message: string = Messages.Error.LABORATORY_NOT_FOUNDED) {
        super(message);
        this.message = message;
    }
}
