import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ExamService } from '../../services/v1';
import { ExamWithoutId, ExamWithoutIds } from './../../interfaces/v1/Exam.interface';


const getActiveExams = async (_req: Request, res: Response) => {
    const exams = await ExamService.listExams()

    return res.status(httpStatus.OK).json({ exams })
}

const associateExamWithLaboratory = async (req: Request, res: Response) => {
    const { examId, laboratoryId } = req.body

    const exam = await ExamService.associateExamWithLaboratory(examId, laboratoryId)

    return res.status(httpStatus.OK).json({ exam })
}

const disassociateALaboratoryFromAnExam = async (req: Request, res: Response) => {
    const { examId, laboratoryId } = req.body

    const exam = await ExamService.disassociateALaboratoryFromAnExam(examId, laboratoryId)

    return res.status(httpStatus.OK).json({ exam })
}

const getLaboratoryByExamName = async (req: Request, res: Response) => {
    const { examName } = req.params
    const laboratories = await ExamService.getLaboratoryByExamName(examName)

    return res.status(httpStatus.OK).json({ laboratories })
}

const createExams = async (req: Request, res: Response) => {
    const { exams: examsData } = req.body

    const exams = await ExamService.createExams(examsData)

    return res.status(httpStatus.CREATED).json({ exams })
}

const deleteExams = async (req: Request, res: Response) => {
    const { examsId } = req.body

    const exams = await ExamService.deleteExams(examsId)

    return res.status(httpStatus.OK).json({ exams })
}

const updateExams = async (req: Request, res: Response) => {
    const { exams: examsToUpdate } = req.body

    const exams = await ExamService.updateExams(examsToUpdate)

    return res.status(httpStatus.OK).json({ exams })
}


export const ExamController = {
    getActiveExams,
    associateExamWithLaboratory,
    disassociateALaboratoryFromAnExam,
    getLaboratoryByExamName,
    createExams,
    deleteExams,
    updateExams


}