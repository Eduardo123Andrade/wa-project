import httpStatus from 'http-status';
import { Connection } from 'typeorm';
import createConnection from "../../../database/connection";
import { LaboratoryWithoutIds } from '../../../interfaces/v1/Laboratory.interface';
import { ExamService, LaboratoryService } from '../../../services/v1';
import { ExamType, Messages, Status } from '../../../utils/v1';
import { ExamsToUpdate, ExamWithoutId, ExamWithoutIds } from './../../../interfaces/v1/Exam.interface';

jest.setTimeout(10_000)


var laboratory1: any
var laboratory2: any
var laboratory3: any
var initialExamValue: any

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


describe('Test about ExamService', () => {

  var connection: Connection | null = null

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
    await createMockedLaboratory()
    await updatedMockedValue()
    initialExamValue = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
    }
  })

  afterAll(async () => {
    if (connection) {
      await connection.dropDatabase()
      await connection.close()
    }
  })

  it('should be create a new exam', async () => {
    const exam = initialExamValue

    const result = await ExamService.createExam(exam)

    expect(result).not.toBeNull()
    expect(result).toHaveProperty('id')
    expect(result.status).toBe(Status.ACTIVE)
    expect(result.laboratories.length).toBeGreaterThanOrEqual(1)
  })

  it('should be throw error if try create exam without valid laboratories', async () => {
    const error = { status: 0, message: '' }
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory3.id]
    }
    await ExamService.createExam(exam).catch(err => {
      error.message = err.message
      error.status = err.status
    })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.INVALID_LABORATORIES)
  })

  it('should be return the list of exams', async () => {
    const result = await ExamService.listExams()
    expect(result.length).toBeGreaterThanOrEqual(0)
  })

  it('should be return existed exam', async () => {
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
    }

    const savedExam = await ExamService.createExam(exam)
    const result = await ExamService.findExamById(savedExam.id)

    expect(result).not.toBeNull()
    expect(result.laboratories.length).toBeGreaterThan(0)
  })

  it('should be throw error if try find nonexistent exam', async () => {
    const id = 0
    var error = { status: 0, message: '' }
    await ExamService.findExamById(id).catch(err => {
      error.message = err.message
      error.status = err.status
    })

    expect(error.status).toBe(httpStatus.NOT_FOUND)
    expect(error.message).toBe(Messages.Error.EXAM_NOT_FOUND)
  })

  it('should be return updated exam', async () => {
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
    }
    const newExamValues: ExamWithoutIds = {
      name: "Exame de Sangue",
      type: ExamType.IMAGE,
      status: Status.INACTIVE
    }

    const savedExam = await ExamService.createExam(exam)
    const result = await ExamService.updateExam(savedExam.id, newExamValues)

    expect(result).not.toBeNull()
    expect(result.id).toBe(savedExam.id)
    expect(result.name).toBe(newExamValues.name)
    expect(result.status).toBe(newExamValues.status)
  })

  it('should be return deleted exam', async () => {
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
    }

    const savedExam = await ExamService.createExam(exam)
    const deletedExam = await ExamService.deleteExam(savedExam.id)

    const exists = await ExamService
      .findExamById(savedExam.id)
      .then(() => true)
      .catch(() => false)

    expect(deletedExam).not.toBeNull()
    expect(deletedExam.id).toBeUndefined()
    expect(exists).toBeFalsy()
  })

  it('should be throw error if try delete nonexistent exam', async () => {
    const id = 0
    const error = { status: 0, message: '' }
    await ExamService.deleteExam(id)
      .catch(err => {
        error.status = err.status
        error.message = err.message
      })

    expect(error.status).toBe(httpStatus.NOT_FOUND)
    expect(error.message).toBe(Messages.Error.EXAM_NOT_FOUND)
  })

  it('should be throw error if try delete inactive exam', async () => {
    const error = { status: 0, message: '' }

    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
    }
    const newExamValues: ExamWithoutIds = {
      name: "Exame de Sangue",
      type: ExamType.IMAGE,
      status: Status.INACTIVE
    }

    const savedExam = await ExamService.createExam(exam)
    const result = await ExamService.updateExam(savedExam.id, newExamValues)

    await ExamService.deleteExam(result.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.CANT_DELETE_INACTIVE_EXAM)

  })

  it('should be return valid exam', async () => {
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
    }

    const savedExam = await ExamService.createExam(exam)
    const result = await ExamService.getValidExam(savedExam.id)

    expect(result).not.toBeNull()
    expect(result).toHaveProperty('id')
    expect(result.status).toBe(Status.ACTIVE)
  })

  it('should throw error if try get nonexistent exam', async () => {
    const id = 0
    const error = { status: 0, message: '' }
    await ExamService.getValidExam(id)
      .catch(err => {
        error.status = err.status
        error.message = err.message
      })

    expect(error.status).toBe(httpStatus.NOT_FOUND)
    expect(error.message).toBe(Messages.Error.EXAM_NOT_FOUND)

  })

  it('should throw error if try get inactive exam', async () => {
    const error = { status: 0, message: '' }

    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
    }
    const newExamValues: ExamWithoutIds = {
      name: "Exame de Sangue",
      type: ExamType.IMAGE,
      status: Status.INACTIVE
    }

    const savedExam = await ExamService.createExam(exam)
    const result = await ExamService.updateExam(savedExam.id, newExamValues)

    await ExamService.getValidExam(result.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.EXAM_INACTIVATED)

  })

  it('should be return the exam with new association', async () => {
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }

    const savedExam = await ExamService.createExam(exam)
    const result = await ExamService.associateExamWithLaboratory(savedExam.id, laboratory2.id)

    expect(result).not.toBeNull()
    expect(result.laboratories.length).toBeGreaterThan(savedExam.laboratories.length)
  })

  it('should throw error if try associate the exam with inactive laboratory', async () => {
    const error = { status: 0, message: '' }
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }

    const savedExam = await ExamService.createExam(exam)
    await ExamService
      .associateExamWithLaboratory(savedExam.id, laboratory3.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.LABORATORY_INACTIVATED)
  })

  it('should throw error if try associate the exam with nonexistent laboratory', async () => {
    const error = { status: 0, message: '' }
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }

    const savedExam = await ExamService.createExam(exam)
    await ExamService
      .associateExamWithLaboratory(savedExam.id, 0)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.NOT_FOUND)
    expect(error.message).toBe(Messages.Error.LABORATORY_NOT_FOUNDED)
  })

  it('should throw error if try associate the laboratory with nonexistent exam', async () => {
    const error = { status: 0, message: '' }
    const id = 0
    await ExamService
      .associateExamWithLaboratory(id, laboratory1.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.NOT_FOUND)
    expect(error.message).toBe(Messages.Error.EXAM_NOT_FOUND)
  })

  it('should throw error if try associate the laboratory with inactive exam', async () => {
    const error = { status: 0, message: '' }

    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }
    const newExamValues: ExamWithoutIds = {
      name: "Exame de Sangue",
      type: ExamType.IMAGE,
      status: Status.INACTIVE
    }

    const savedExam = await ExamService.createExam(exam)
    const updatedExam = await ExamService.updateExam(savedExam.id, newExamValues)

    await ExamService
      .associateExamWithLaboratory(updatedExam.id, laboratory2.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.EXAM_INACTIVATED)
  })

  it('should throw error if try associate the laboratory with laboratory already associated', async () => {
    const error = { status: 0, message: '' }

    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }

    const savedExam = await ExamService.createExam(exam)

    await ExamService
      .associateExamWithLaboratory(savedExam.id, laboratory1.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    // expect(error.status).toBe(httpStatus.FORBIDDEN)
    // expect(error.message).toBe(Messages.Error.LABORATORY_ALREADY_ASSOCIATED)

  })

  it('should be return the exam with less associations', async () => {
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id]
    }

    const savedExam = await ExamService.createExam(exam)

    const result = await ExamService.disassociateALaboratoryFromAnExam(savedExam.id, laboratory2.id)

    expect(result).not.toBeNull()
    expect(result.laboratories.length).toBeLessThan(savedExam.laboratories.length)
  })

  it('should throw error if try disassociate the exam with inactive laboratory', async () => {
    const error = { status: 0, message: '' }
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }

    const savedExam = await ExamService.createExam(exam)
    await ExamService
      .disassociateALaboratoryFromAnExam(savedExam.id, laboratory3.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.LABORATORY_INACTIVATED)
  })

  it('should throw error if try disassociate the exam with nonexistent laboratory', async () => {
    const error = { status: 0, message: '' }
    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }

    const savedExam = await ExamService.createExam(exam)
    await ExamService
      .disassociateALaboratoryFromAnExam(savedExam.id, 0)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.NOT_FOUND)
    expect(error.message).toBe(Messages.Error.LABORATORY_NOT_FOUNDED)
  })

  it('should throw error if try disassociate the laboratory with nonexistent exam', async () => {
    const error = { status: 0, message: '' }
    const id = 0
    await ExamService
      .disassociateALaboratoryFromAnExam(id, laboratory1.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.NOT_FOUND)
    expect(error.message).toBe(Messages.Error.EXAM_NOT_FOUND)
  })

  it('should throw error if try disassociate the laboratory with inactive exam', async () => {
    const error = { status: 0, message: '' }

    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }
    const newExamValues: ExamWithoutIds = {
      name: "Exame de Sangue",
      type: ExamType.IMAGE,
      status: Status.INACTIVE
    }

    const savedExam = await ExamService.createExam(exam)
    const updatedExam = await ExamService.updateExam(savedExam.id, newExamValues)

    await ExamService
      .disassociateALaboratoryFromAnExam(updatedExam.id, laboratory2.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.EXAM_INACTIVATED)
  })

  it('should throw error if exam stays less then one association', async () => {
    const error = { status: 0, message: '' }

    const exam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id]
    }

    const savedExam = await ExamService.createExam(exam)

    await ExamService
      .disassociateALaboratoryFromAnExam(savedExam.id, laboratory1.id)
      .catch(err => {
        error.message = err.message
        error.status = err.status
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.MINIMUM_QUANTITY_OF_LABORATORY_ASSOCIATIONS)
  })

  it('should return a list of laboratories associated with an exam', async () => {
    const newExam: ExamWithoutId = {
      name: 'Exame Test',
      type: ExamType.CLINICAL_ANALYSIS,
      laboratoriesIds: [laboratory1.id, laboratory2.id, laboratory3.id]
    }

    const exam = await ExamService.createExam(newExam)
    const laboratories = await ExamService.getLaboratoryByExamName(exam.name)

    expect(laboratories).not.toBeNull()
    expect(laboratories).toHaveProperty('length')
    expect(laboratories.length).toBeGreaterThan(0)
  })

  it('should throw error if try get list of laboratories with exam name invalid', async () => {
    const examName = 'hahaha'
    const error = { status: 0, message: '' }
    await ExamService.getLaboratoryByExamName(examName)
      .catch(err => {
        error.status = err.status
        error.message = err.message
      })

    expect(error.status).toBe(httpStatus.NOT_FOUND)
    expect(error.message).toBe(Messages.Error.EXAM_NOT_FOUND)
  })

  it('should return list of new exams', async () => {
    const newExamsData = [initialExamValue, initialExamValue, initialExamValue]
    const exams = await ExamService.createExams(newExamsData)

    expect(exams).not.toBeUndefined()
    expect(exams).toHaveProperty('length')
    expect(exams.length).toBeGreaterThanOrEqual(newExamsData.length)
    expect(exams[0].id).not.toBeUndefined()
  })

  it('should return list of deleted exams', async () => {
    const newExamsData = [initialExamValue, initialExamValue, initialExamValue]
    const newExams = await ExamService.createExams(newExamsData)
    const listOfIds = newExams.map(exam => exam.id)

    const deletedExam = await ExamService.deleteExams(listOfIds)

    expect(deletedExam).not.toBeUndefined()
    expect(deletedExam).toHaveProperty('length')
    expect(deletedExam.length).toBeGreaterThanOrEqual(newExamsData.length)
    expect(deletedExam[0].id).toBeUndefined()
  })

  it('should throw error if try delete invalid exam', async () => {
    const listOfIds = [-1, -2, -3]
    const error = { status: 0, message: '' }
    await ExamService.deleteExams(listOfIds)
      .catch(err => {
        error.status = err.status
        error.message = err.message
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.INVALID_EXAMS)
  })

  it('should return list of updated exams', async () => {
    const newExam1 = await ExamService.createExam(initialExamValue)
    const newExam2 = await ExamService.createExam(initialExamValue)

    const newValueToUpdate1: ExamsToUpdate = {
      id: newExam1.id,
      data: {
        ...newExam1,
        status: Status.INACTIVE,
      }
    }

    const newValueToUpdate2: ExamsToUpdate = {
      id: newExam2.id,
      data: {
        ...newExam2,
        status: Status.INACTIVE,
      }
    }

    const examsToUpdate = [newValueToUpdate1, newValueToUpdate2]

    const exams = await ExamService.updateExams(examsToUpdate)

    expect(exams).not.toBeUndefined()
    expect(exams).toHaveProperty('length')
    expect(exams.length).toBeGreaterThanOrEqual(examsToUpdate.length)
    expect(exams[0]).toHaveProperty('id')
    expect(exams[0].id).not.toBeNull()
    expect(exams[0].status).toBe(Status.INACTIVE)
  })

  it('should throw error if try update exams with invalid data', async () => {
    const error = { status: 0, message: '' }
    await ExamService.updateExams([])
      .catch(err => {
        error.status = err.status
        error.message = err.message
      })

    expect(error.status).toBe(httpStatus.FORBIDDEN)
    expect(error.message).toBe(Messages.Error.INVALID_EXAMS)
  })

  
})
