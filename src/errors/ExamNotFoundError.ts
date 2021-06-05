import { Messages } from '../utils/v1/ConstantsMessages';
import { NotFoundError } from './NotFoundError';

export class ExamNotFoundError extends NotFoundError {
    message: string;

    constructor(message: string = Messages.Error.EXAM_NOT_FOUND) {
        super(message);
        this.message = message;
    }
}
