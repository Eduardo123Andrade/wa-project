import httpStatus from 'http-status';
import { Connection } from "typeorm";
import createConnection from "../../../database/connection";
import { Address } from '../../../models/v1';
import { LaboratoryService } from '../../../services/v1/';
import { Status } from '../../../utils/v1';
import { LaboratoryToUpdate, LaboratoryWithoutIds } from './../../../interfaces/v1/Laboratory.interface';
import { Laboratory } from './../../../models/v1/Laboratory.model';
import { Messages } from './../../../utils/v1/ConstantsMessages';


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

describe('Tests about LaboratoryService', () => {

    var laboratory = initialLaboratoryValue

    var connection: Connection | null = null

    beforeAll(async () => {
        connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        if (connection) {
            await connection.dropDatabase()
            await connection.close()
        }
    })


    it('should be return a new Laboratory', async () => {
        const result = await LaboratoryService.createLaboratory(laboratory)
        laboratory = result

        expect(result).toBeInstanceOf(Laboratory)
        expect(result).toHaveProperty('id')
        expect(result.name).toBe(laboratory.name)
        expect(result.status).toBe(Status.ACTIVE)
        expect(result.address).toBeInstanceOf(Address)
    })

    it('should be return updated lab', async () => {
        const result = await LaboratoryService.updateLaboratory(laboratory.id, valuesToUpdateTheLaboratory)

        expect(result.id).toBe(laboratory.id)
        expect(result.address.id).toBe(laboratory.address.id)
        expect(result.name).toBe(valuesToUpdateTheLaboratory.name)
        expect(result.status).toBe(valuesToUpdateTheLaboratory.status)
    })

    it('should be throw error if try update a not found laboratory', async () => {
        const id = 0
        var error = { status: 0, message: '' }

        await LaboratoryService.updateLaboratory(id, valuesToUpdateTheLaboratory).catch(err => {
            error.message = err.message
            error.status = err.status
        })

        expect(error.status).toBe(httpStatus.NOT_FOUND)
        expect(error.message).toBe(Messages.Error.LABORATORY_NOT_FOUNDED)
    })

    it('should be return a laboratory if receive a valid id', async () => {
        const result = await LaboratoryService.findLaboratory(laboratory.id)

        expect(result).not.toBeNull()
        expect(result.id).toBe(laboratory.id)
    })

    it('should be throw error if not found a laboratory', async () => {
        const id = 0
        var error = { status: 0, message: '' }
        await LaboratoryService.findLaboratory(id).catch(err => {
            error.message = err.message
            error.status = err.status
        })

        expect(error.status).toBe(httpStatus.NOT_FOUND)
        expect(error.message).toBe(Messages.Error.LABORATORY_NOT_FOUNDED)
    })

    it('should be return the list of laboratories', async () => {
        const result = await LaboratoryService.listLaboratories()
        expect(result.length).toBeGreaterThanOrEqual(0)
    })

    it('should be return deleted laboratory', async () => {
        const activeLab = initialLaboratoryValue
        const activatedLaboratory = await LaboratoryService.createLaboratory(activeLab)
        const deletedLaboratory = await LaboratoryService.deleteLaboratory(activatedLaboratory.id)

        const exists = await LaboratoryService
            .findLaboratory(activatedLaboratory.id)
            .then(() => true)
            .catch(() => false)

        expect(deletedLaboratory).not.toBeNull()
        expect(deletedLaboratory.id).toBeUndefined()
        expect(exists).toBeFalsy()
    })

    it('should be throw error if try delete inactive laboratory', async () => {
        const error = { status: 0, message: '' }
        await LaboratoryService
            .deleteLaboratory(laboratory.id)
            .catch(err => {
                error.message = err.message
                error.status = err.status
            })

        expect(error.status).toBe(httpStatus.FORBIDDEN)
        expect(error.message).toBe(Messages.Error.CANT_DELETE_INACTIVE_LABORATORY)

    })

    it('should be return valid laboratory', async () => {
        const newLaboratory = initialLaboratoryValue
        const savedLaboratory = await LaboratoryService.createLaboratory(newLaboratory)
        const laboratory = await LaboratoryService.getValidLaboratory(savedLaboratory.id)

        expect(laboratory).not.toBeNull()
        expect(laboratory).toBeTruthy()
    })

    it('should be throw error if try get nonexistent laboratory', async () => {
        const id = 0
        var error = { status: 0, message: '' }
        await LaboratoryService.getValidLaboratory(id).catch(err => {
            error.message = err.message
            error.status = err.status
        })

        expect(error.status).toBe(httpStatus.NOT_FOUND)
        expect(error.message).toBe(Messages.Error.LABORATORY_NOT_FOUNDED)
    })

    it('should be throw error if try get unactived laboratory', async () => {
        var error = { status: 0, message: '' }
        await LaboratoryService.getValidLaboratory(laboratory.id).catch(err => {
            error.message = err.message
            error.status = err.status
        })

        expect(error.status).toBe(httpStatus.FORBIDDEN)
        expect(error.message).toBe(Messages.Error.LABORATORY_INACTIVATED)
    })

    it('should return list of deleted laboratories', async () => {
        const laboratory1 = await LaboratoryService.createLaboratory(initialLaboratoryValue)
        const laboratory2 = await LaboratoryService.createLaboratory(initialLaboratoryValue)

        const laboratoriesIds = [laboratory1.id, laboratory2.id, -10]

        const laboratories = await LaboratoryService.deleteLaboratories(laboratoriesIds)

        expect(laboratories).not.toBeNull()
        expect(laboratories).toHaveProperty('length')
        expect(laboratories.length).toBeGreaterThanOrEqual(2)
        expect(laboratories[0].id).toBeUndefined()
    })

    it('should return list of new laboratories', async () => {
        const newLaboratoryValue1 = initialLaboratoryValue
        const newLaboratoryValue2 = initialLaboratoryValue
        const newLaboratories = [newLaboratoryValue1, newLaboratoryValue2]

        const laboratories = await LaboratoryService.createLaboratories(newLaboratories)

        expect(laboratories).not.toBeUndefined()
        expect(laboratories).toHaveProperty('length')
        expect(laboratories.length).toBeGreaterThanOrEqual(2)
        expect(laboratories[0]).toHaveProperty('id')
        expect(laboratories[0].id).not.toBeNull()
    })

    it('should return list of updated laboratories', async () => {
        const newLaboratory1 = await LaboratoryService.createLaboratory(initialLaboratoryValue)
        const newLaboratory2 = await LaboratoryService.createLaboratory(initialLaboratoryValue)

        const newValueToUpdate1: LaboratoryToUpdate = {
            id: newLaboratory1.id,
            data: {
                ...newLaboratory1,
                status: Status.INACTIVE,
            }
        }

        const newValueToUpdate2: LaboratoryToUpdate = {
            id: newLaboratory2.id,
            data: {
                ...newLaboratory2,
                status: Status.INACTIVE,
            }
        }

        const laboratoriesToUpdate = [newValueToUpdate1, newValueToUpdate2]

        const laboratories = await LaboratoryService.updateLaboratories(laboratoriesToUpdate)

        expect(laboratories).not.toBeUndefined()
        expect(laboratories).toHaveProperty('length')
        expect(laboratories.length).toBeGreaterThanOrEqual(2)
        expect(laboratories[0]).toHaveProperty('id')
        expect(laboratories[0].id).not.toBeNull()
    })

    it('should throw error if try update laboratories with invalid data', async () => {
        const laboratoriesToUpdate: LaboratoryToUpdate[] = []
        const error = { status: 0, message: '' }
        await LaboratoryService
            .updateLaboratories(laboratoriesToUpdate)
            .catch(err => {
                error.status = err.status
                error.message = err.message
            })

        expect(error.status).toBe(httpStatus.FORBIDDEN)
        expect(error.message).toBe(Messages.Error.INVALID_LABORATORIES)
    })
})