import { Messages } from '../utils/v1/ConstantsMessages';
import { InactiveEntityError } from './InactiveEntityError';

export class InactiveLaboratoryError extends InactiveEntityError {
    message: string;

    constructor(message: string = Messages.Error.LABORATORY_INACTIVATED) {
        super(message);
        this.message = message;
    }
}
