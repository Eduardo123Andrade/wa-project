import httpStatus from 'http-status';
import request from 'supertest';
import { Connection } from 'typeorm';
import app from '../../../app';
import createConnection from "../../../database/connection";
import { LaboratoryService } from '../../../services/v1';
import { ExamType, Messages, Status } from '../../../utils/v1';
import { ExamsToUpdate, ExamWithoutId } from './../../../interfaces/v1/Exam.interface';
import { LaboratoryWithoutIds } from './../../../interfaces/v1/Laboratory.interface';
import { Exam } from './../../../models/v1/Exam.model';

jest.setTimeout(10_000)

const version = 'v1'

var laboratory1: any
var laboratory2: any
var laboratory3: any
var initialExamValue: ExamWithoutId;

const createMockedLaboratory = async () => {
    laboratory1 = await LaboratoryService.createLaboratory(initialLaboratoryValue)
    laboratory2 = await LaboratoryService.createLaboratory(initialLaboratoryValue)
    laboratory3 = await LaboratoryService.createLaboratory(initialLaboratoryValue)
}

const updatedMockedValue = async () => {
    await LaboratoryService.updateLaboratory(laboratory3.id, valuesToUpdateTheLaboratory)
}

const valuesToUpdateTheLaboratory: LaboratoryWithoutIds = {
    name: 'Lab Stark',
    status: Status.INACTIVE,
    address: {
        city: 'Paulista',
        street: "Casa",
        neighborhood: "Winterfell",
        state: "North",
        number: '10',
        postalCode: 'xxxxxx'
    }
}

const initialLaboratoryValue: any = {
    name: "Lab test",
    address: {
        number: '6',
        street: '102',
        neighborhood: 'Maranguape II',
        city: 'Paulista',
        state: 'Pernambuco',
        postalCode: '53421491'
    }
}

describe("Integration's test about exam", () => {
    var connection: Connection | null = null

    beforeAll(async () => {
        connection = await createConnection()
        await connection.runMigrations()
        await createMockedLaboratory()
        await updatedMockedValue()
        initialExamValue = {
            name: 'Stark Laboratory',
            type: ExamType.CLINICAL_ANALYSIS,
            laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
        }

    })

    afterAll(async () => {
        if (connection) {
            // await connection.dropDatabase()
            await connection.close()
        }
    })

    it('should return a list of active exams', async () => {
        const newExams = [initialExamValue, initialExamValue]
        await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams: newExams })

        const response = await request(app)
            .get(`/${version}/list-activated-exam`)

        const { body } = response
        const { exams } = body

        expect(response.status).toBe(httpStatus.OK)
        expect(body).not.toBeNull()
        expect(exams).toHaveProperty('length')
        expect(exams.length).toBeGreaterThanOrEqual(1)

    })

    it('should be return the exam with new association', async () => {
        const newExam: ExamWithoutId = {
            name: 'Stark Laboratory',
            type: ExamType.CLINICAL_ANALYSIS,
            laboratoriesIds: [laboratory1.id]
        }

        const responseCreated = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams: [newExam] })

        const { exams: createdExams } = responseCreated.body
        const createdExam = createdExams[0]
        const value = {
            examId: createdExam.id,
            laboratoryId: laboratory2.id
        }

        const response = await request(app)
            .put(`/${version}/associate-the-exam-with-a-laboratory`)
            .send(value)

        const { body } = response
        const { exam } = body

        expect(response.status).toBe(httpStatus.OK)
        expect(body).not.toBeNull()
        expect(exam).not.toBeNull()
        expect(exam.id).toBe(createdExam.id)
        expect(exam.laboratories.length).toBeGreaterThan(createdExam.laboratories.length)
    })

    it('should throw error if try associate exam with invalid data', async () => {
        const newExam: ExamWithoutId = {
            name: 'Stark Laboratory',
            type: ExamType.CLINICAL_ANALYSIS,
            laboratoriesIds: [laboratory1.id]
        }

        const responseCreated = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams: [newExam] })

        const { exams: createdExams } = responseCreated.body
        const createdExam = createdExams[0]
        const value = {
            examId: createdExam.id,
        }

        const response = await request(app)
            .put(`/${version}/associate-the-exam-with-a-laboratory`)
            .send(value)

        const { body } = response
        const { exam, errors } = body

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(body).not.toBeNull()
        expect(body.message).toBe(Messages.Validate.VALIDATION_ERROR)
        expect(exam).toBeUndefined()
        expect(errors).not.toBeNull()
    })

    it('should be return the exam with less associations', async () => {
        const newExam: ExamWithoutId = {
            name: 'Exame Test',
            type: ExamType.CLINICAL_ANALYSIS,
            laboratoriesIds: [laboratory1.id, laboratory2.id]
        }

        const responseCreated = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams: [newExam] })

        const { exams: createdExams } = responseCreated.body
        const createdExam = createdExams[0]
        const value = {
            examId: createdExam.id,
            laboratoryId: laboratory2.id
        }
        const response = await request(app)
            .put(`/${version}/disassociate-a-laboratory-from-an-exam`)
            .send(value)

        const { body } = response
        const { exam } = body

        expect(response.status).toBe(httpStatus.OK)
        expect(body).not.toBeNull()
        expect(exam).not.toBeNull()
        expect(exam.id).toBe(createdExam.id)
        expect(exam.laboratories.length).toBeLessThan(createdExam.laboratories.length)
    })

    it('should throw error if try disassociated exam with invalid data', async () => {
        const newExam: ExamWithoutId = {
            name: 'Stark Laboratory',
            type: ExamType.CLINICAL_ANALYSIS,
            laboratoriesIds: [laboratory1.id, laboratory2.id]
        }

        const responseCreated = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams: [newExam] })

        const { exams: createdExams } = responseCreated.body
        const createdExam = createdExams[0]
        const value = {
            examId: createdExam.id,
        }

        const response = await request(app)
            .put(`/${version}/disassociate-a-laboratory-from-an-exam`)
            .send(value)

        const { body } = response
        const { exam, errors } = body

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(body).not.toBeNull()
        expect(body.message).toBe(Messages.Validate.VALIDATION_ERROR)
        expect(exam).toBeUndefined()
        expect(errors).not.toBeNull()
    })

    it('should return a list of laboratories associated with an exam', async () => {
        const newExam: ExamWithoutId = {
            name: 'Stark Laboratory',
            type: ExamType.CLINICAL_ANALYSIS,
            laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
        }

        const responseCreated = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams: [newExam] })

        const { exams: createdExams } = responseCreated.body
        const examName = createdExams[0].name

        const response = await request(app)
            .get(`/${version}/get-laboratories-by-exam-name/${examName}`)

        const { body } = response
        const { laboratories } = body

        expect(response.status).toBe(httpStatus.OK)
        expect(body).not.toBeNull()
        expect(laboratories).not.toBeNull()
        expect(laboratories).toHaveProperty('length')
        expect(laboratories.length).toBeGreaterThan(0)
    })

    it('should throw not found error if try access the route without exam name as param', async () => {
        const response = await request(app)
            .get(`/${version}/get-laboratories-by-exam-name`)

        const { body } = response
        const { laboratories } = body

        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(body).not.toBeNull()
        expect(laboratories).toBeUndefined()
    })

    it('should return list of new exams', async () => {
        const exams = [initialExamValue, initialExamValue, initialExamValue]

        const response = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams })

        const { exams: examsCreated } = response.body

        expect(response.status).toBe(httpStatus.CREATED)
        expect(examsCreated).not.toBeUndefined()
        expect(examsCreated).toHaveProperty('length')
        expect(examsCreated.length).toBeLessThanOrEqual(exams.length)
        expect(examsCreated[0].id).not.toBeUndefined()
    })

    it('should throw validation error if try create exam with invalid data', async () => {
        const exam1 = {
            type: 'hahah',
            laboratories: [1, 2, 3]
        }
        const exam2 = {
            name: 'teste',
            type: 'hahah',
        }

        const newExams = [exam1, exam2]

        const response = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams: newExams })

        const { body, status } = response
        const { exams, errors } = body

        expect(status).toBe(httpStatus.BAD_REQUEST)
        expect(body).not.toBeNull()
        expect(body.message).toBe(Messages.Validate.VALIDATION_ERROR)
        expect(exams).toBeUndefined()
        expect(errors).not.toBeUndefined()
    })

    it('should return a list of deleted exams', async () => {
        const exams = [initialExamValue, initialExamValue, initialExamValue]

        const responseCreated = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams })

        const { exams: examsCreated } = responseCreated.body

        const examsId = examsCreated.map((exam: Exam) => exam.id)

        const response = await request(app)
            .delete(`/${version}/delete-exams`)
            .send({ examsId })

        const { exams: deletedExams } = response.body

        expect(response.status).toBe(httpStatus.OK)
        expect(deletedExams).not.toBeUndefined()
        expect(deletedExams).toHaveProperty('length')
        expect(deletedExams.length).toBeLessThanOrEqual(exams.length)
        expect(deletedExams[0].id).toBeUndefined()
    })

    it('should throw error if try delete exams with invalid data', async () => {
        const response = await request(app)
            .delete(`/${version}/delete-exams`)

        const { body, status } = response
        const { exams, errors } = body

        expect(status).toBe(httpStatus.BAD_REQUEST)
        expect(body).not.toBeNull()
        expect(body.message).toBe(Messages.Validate.VALIDATION_ERROR)
        expect(exams).toBeUndefined()
        expect(errors).not.toBeUndefined()


    })

    it('should return a list of updated exams', async () => {
        const responseCreated = await request(app)
            .post(`/${version}/create-exams`)
            .send({ exams: [initialExamValue, initialExamValue] })

        const { exams: examsCreated } = responseCreated.body

        const exams: ExamsToUpdate[] = examsCreated.map((exam: Exam) => {
            return {
                id: exam.id,
                data: {
                    ...exam,
                    status: Status.INACTIVE,
                    type: ExamType.IMAGE
                }
            }
        })

        const response = await request(app)
            .put(`/${version}/update-exams`)
            .send({ exams })

        const { body, status } = response
        const { exams: updatedExams } = body

        expect(status).toBe(httpStatus.OK)
        expect(updatedExams).not.toBeUndefined()
        expect(updatedExams.length).not.toBeUndefined()
        expect(updatedExams.length).toBe(exams.length)
        expect(updatedExams[0].id).not.toBeUndefined()

    })

    it('should throw validation error if try update exams with invalid data', async () => {
        const response = await request(app)
            .put(`/${version}/update-exams`)

        const { body } = response
        const { laboratories, errors } = body

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(body).not.toBeNull()
        expect(body.message).toBe(Messages.Validate.VALIDATION_ERROR)
        expect(laboratories).toBeUndefined()
        expect(errors).not.toBeNull()

    })

})