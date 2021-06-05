import httpStatus from 'http-status';
import request from 'supertest';
import { Connection } from 'typeorm';
import app from '../../../app';
import createConnection from "../../../database/connection";
import { Messages, Status } from '../../../utils/v1';
import { LaboratoryToUpdate, LaboratoryWithoutDefaultFields } from './../../../interfaces/v1/Laboratory.interface';
import { Laboratory } from './../../../models/v1/Laboratory.model';

const version = 'v1'

const initialLaboratoryValue: LaboratoryWithoutDefaultFields = {
    name: 'Stark Laboratory',
    address: {
        number: '6',
        street: '102',
        neighborhood: "Maranguape II",
        city: "Paulista",
        state: "Pernanbuco",
        postalCode: "53421491"
    }
}

describe("Integration's test about laboratory", () => {

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

   
    it('should return list of activated laboratory', async () => {
        const newLaboratories = [initialLaboratoryValue, initialLaboratoryValue]

        await request(app)
            .post(`/${version}/create-laboratories`)
            .send({ laboratories: newLaboratories })

        const response = await request(app)
            .get(`/${version}/list-activated-laboratory`)

        const { body } = response
        const { laboratories } = body

        expect(response.status).toBe(httpStatus.OK)
        expect(body).not.toBeNull()
        expect(laboratories).toHaveProperty('length')
        expect(laboratories.length).toBeGreaterThanOrEqual(newLaboratories.length)

    })

    it('should return a list of new laboratories', async () => {
        const laboratoriesData = [initialLaboratoryValue, initialLaboratoryValue]

        const response = await request(app)
            .post(`/${version}/create-laboratories`)
            .send({ laboratories: laboratoriesData })

        const { body, status } = response
        const { laboratories } = body

        expect(status).toBe(httpStatus.CREATED)
        expect(laboratories).not.toBeUndefined()
        expect(laboratories).toHaveProperty('length')
        expect(laboratories.length).toBeGreaterThanOrEqual(2)
        expect(laboratories[0]).toHaveProperty('id')
        expect(laboratories[0].id).not.toBeUndefined()

    })

    it('should throw validation error if try crate laboratories with invalid data', async () => {
        const newLaboratory: any = {
            address: {
                number: '6',
                street: '102',
                city: "Paulista",
                state: "Pernanbuco",
                postalCode: "53421491"
            }
        }

        const laboratoriesData = [initialLaboratoryValue, initialLaboratoryValue, newLaboratory]

        const response = await request(app)
            .post(`/${version}/create-laboratories`)
            .send({ laboratories: laboratoriesData })

        const { body } = response
        const { laboratories, errors } = body

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(body).not.toBeNull()
        expect(body.message).toBe(Messages.Validate.VALIDATION_ERROR)
        expect(laboratories).toBeUndefined()
        expect(errors).not.toBeNull()

    })

    it('should return a list of deleted laboratories', async () => {
        const createdResponse = await request(app)
            .post(`/${version}/create-laboratories`)
            .send({ laboratories: [initialLaboratoryValue, initialLaboratoryValue] })

        const { laboratories: createdLaboratories } = createdResponse.body
        const laboratoriesId = createdLaboratories.map((laboratory: Laboratory) => laboratory.id)


        const response = await request(app)
            .delete(`/${version}/delete-laboratories`)
            .send({ laboratoriesId })

        const { body, status } = response
        const { laboratories } = body

        expect(status).toBe(httpStatus.OK)
        expect(laboratories).not.toBeUndefined()
        expect(laboratories).toHaveProperty('length')
        expect(laboratories.length).toBeGreaterThanOrEqual(2)
        expect(laboratories[0].id).toBeUndefined()

    })

    it('should throw validation error if try delete laboratories with invalid data', async () => {
        const response = await request(app)
            .delete(`/${version}/delete-laboratories`)

        const { body } = response
        const { laboratories, errors } = body

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(body).not.toBeNull()
        expect(body.message).toBe(Messages.Validate.VALIDATION_ERROR)
        expect(laboratories).toBeUndefined()
        expect(errors).not.toBeNull()

    })

    it('should return a list of updated laboratories', async () => {
        const createdResponse = await request(app)
            .post(`/${version}/create-laboratories`)
            .send({ laboratories: [initialLaboratoryValue, initialLaboratoryValue] })

        const { laboratories: createdLaboratories } = createdResponse.body
        const laboratoriesToUpdate: LaboratoryToUpdate[] = createdLaboratories.map((laboratory: Laboratory) => {
            return {
                id: laboratory.id,
                data: {
                    ...laboratory,
                    status: Status.INACTIVE
                }
            }
        })

        const response = await request(app)
            .put(`/${version}/update-laboratories`)
            .send({ laboratories: laboratoriesToUpdate })

        const { body, status } = response
        const { laboratories } = body

        expect(status).toBe(httpStatus.OK)
        expect(laboratories).not.toBeUndefined()
        expect(laboratories).toHaveProperty('length')
        expect(laboratories.length).toBeLessThanOrEqual(createdLaboratories.length)
        expect(laboratories[0].status).not.toBe(createdLaboratories[0].status)

    })

    it('should throw validation error if try update laboratories with invalid data', async () => {
        const response = await request(app)
            .put(`/${version}/update-laboratories`)

        const { body } = response
        const { laboratories, errors } = body

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(body).not.toBeNull()
        expect(body.message).toBe(Messages.Validate.VALIDATION_ERROR)
        expect(laboratories).toBeUndefined()
        expect(errors).not.toBeNull()

    })

})