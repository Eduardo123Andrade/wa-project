import { Messages } from '../utils/v1/ConstantsMessages';
import { InactiveEntityError } from './InactiveEntityError';

export class InactiveLaExamError extends InactiveEntityError {
    message: string;

    constructor(message: string = Messages.Error.EXAM_INACTIVATED) {
        super(message);
        this.message = message;
    }
}
