import { getRepository, In } from 'typeorm';
import { Exam } from '../../models/v1';
import { Status } from '../../utils/v1';
import { DeleteInactiveExamError } from './../../errors/DeleteInactiveExamError';
import { ExamNotFoundError } from './../../errors/ExamNotFoundError';
import { InactiveLaExamError } from './../../errors/InactiveExamError';
import { InvalidExamError } from './../../errors/InvalidExamError';
import { LaboratoryAlreadyAssociatedError } from './../../errors/LaboratoryAlreadyAssociatedError';
import { MinimumQuantityOfAssociationsError } from './../../errors/MinimumQuantityOfAssociationsError';
import { ExamsToUpdate, ExamWithoutId, ExamWithoutIds } from './../../interfaces/v1/Exam.interface';
import { LaboratoryService } from './Laboratory.service';


const createExam = async (exam: ExamWithoutId) => {
    const repository = getRepository(Exam)
    const labs = await LaboratoryService.getListOfValidLaboratories(exam.laboratoriesIds)

    const examData = repository.create(exam)
    examData.laboratories = labs

    const result = await repository.save(examData)

    return result
}

const updateExam = async (examId: number, examData: ExamWithoutIds) => {
    const repository = getRepository(Exam)
    const exam = await findExamById(examId)

    Object.assign(exam, examData)

    const result = await repository.save(exam)

    return result
}

const listExams = async () => {
    const repository = getRepository(Exam)
    const laboratories = repository.find({ where: { status: Status.ACTIVE } })

    return laboratories
}

const deleteExam = async (examId: number) => {
    const repository = getRepository(Exam)
    const exam = await findExamById(examId)

    if (exam.status !== Status.ACTIVE)
        throw new DeleteInactiveExamError()

    const result = await repository.remove(exam)

    return result
}

const findExamById = async (examId: number) => {
    const repository = getRepository(Exam)
    const exam = await repository.findOne({ where: { id: examId } })

    if (!exam)
        throw new ExamNotFoundError()

    return exam
}

const getValidExam = async (examId: number) => {
    const exam = await findExamById(examId)

    if (exam.status !== Status.ACTIVE)
        throw new InactiveLaExamError()

    return exam
}

const associateExamWithLaboratory = async (examId: number, laboratoryId: number) => {
    const repository = getRepository(Exam)
    const exam = await getValidExam(examId)
    const laboratory = await LaboratoryService.getValidLaboratory(laboratoryId)

    const { laboratories } = exam

    const laboratoryAlreadyAssociated = !!laboratories.filter(lab => lab.id === laboratoryId).length

    if (laboratoryAlreadyAssociated) {
        throw new LaboratoryAlreadyAssociatedError()
    }

    exam.laboratories.push(laboratory)
    const result = await repository.save(exam)

    return result
}

const disassociateALaboratoryFromAnExam = async (examId: number, laboratoryId: number) => {
    const repository = getRepository(Exam)
    const exam = await getValidExam(examId)
    await LaboratoryService.getValidLaboratory(laboratoryId)

    const { laboratories } = exam

    const newListOfLaboratories = laboratories.filter(lab => lab.id !== laboratoryId)

    if (!newListOfLaboratories.length) {
        throw new MinimumQuantityOfAssociationsError()
    }

    exam.laboratories = newListOfLaboratories
    const result = await repository.save(exam)

    return result

}

const getLaboratoryByExamName = async (examName: string) => {
    const repository = getRepository(Exam)
    const exam = await repository.findOne({ where: { name: examName } })

    if (!exam)
        throw new ExamNotFoundError()

    const { laboratories } = exam

    return laboratories
}

const createExams = async (exams: ExamWithoutId[]) => {
    const newExams: Exam[] = []
    await Promise.all(
        exams.map(async examData => {
            const exam = await createExam(examData).catch(() => null)
            if (exam) newExams.push(exam)
        })
    )

    return newExams
}

const deleteExams = async (examsId: number[]) => {
    const exams: Exam[] = []
    await Promise.all(
        examsId.map(async id => {
            const exam = await deleteExam(id).catch(() => null)
            if (exam) exams.push(exam)
        })
    )

    if (!exams.length)
        throw new InvalidExamError()

    return exams
}

const updateExams = async (examsToUpdate: ExamsToUpdate[]) => {
    const exams: Exam[] = []
    await Promise.all(
        examsToUpdate.map(async exam => {
            const updatedExam = await updateExam(exam.id, exam.data).catch(() => null)
            if (updatedExam) exams.push(updatedExam)
        })
    )

    if (!exams.length) {
        throw new InvalidExamError()
    }

    return exams
}

export const ExamService = {
    createExam,
    listExams,
    findExamById,
    deleteExam,
    updateExam,
    getValidExam,
    associateExamWithLaboratory,
    disassociateALaboratoryFromAnExam,
    getLaboratoryByExamName,
    createExams,
    deleteExams,
    updateExams
}