import { ExamType, Status } from './../../utils/v1/enum';


export interface ExamWithoutId {
    name: string
    type: ExamType
    laboratoriesIds: number[]
}

export interface ExamWithoutIds {
    name: string
    type: ExamType
    status: Status
}

export interface ExamsToUpdate {
    id: number,
    data: ExamWithoutIds
}