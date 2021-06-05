import { InvalidLaboratoryError } from './../../errors/InvalidLaboratoryError';
import { InactiveLaboratoryError } from './../../errors/InactiveLaboratoryError';
import { LaboratoryNotFoundError } from './../../errors/LaboratoryNotFoundError';
import { getRepository, In } from 'typeorm';
import { Laboratory } from '../../models/v1/Laboratory.model';
import { LaboratoryToUpdate, LaboratoryWithoutDefaultFields, LaboratoryWithoutIds } from './../../interfaces/v1/Laboratory.interface';
import { Status } from './../../utils/v1';
import { DeleteInactivatedLaboratoryError } from '../../errors/DeleteInactivatedLaboratoryError';


const createLaboratory = async (laboratory: LaboratoryWithoutDefaultFields) => {
    const repository = getRepository(Laboratory)
    const savedLaboratory = repository.create(laboratory)
    const result = await repository.save(savedLaboratory)

    return result
}

const updateLaboratory = async (laboratoryId: number, laboratoryData: LaboratoryWithoutIds) => {
    const repository = getRepository(Laboratory)
    const laboratory = await findLaboratory(laboratoryId)

    const { address } = laboratory

    Object.assign(address, laboratoryData.address)

    Object.assign(laboratory, laboratoryData)

    Object.assign(laboratory.address, address)

    const result = repository.save(laboratory)

    return result
}

const findLaboratory = async (laboratoryId: number) => {
    const repository = getRepository(Laboratory)
    const laboratory = await repository.findOne({ where: { id: laboratoryId } })

    if (!laboratory)
        throw new LaboratoryNotFoundError()

    return laboratory
}

const deleteLaboratory = async (laboratoryId: number) => {
    const repository = getRepository(Laboratory)
    const laboratory = await findLaboratory(laboratoryId)

    if (laboratory.status !== Status.ACTIVE)
        throw new DeleteInactivatedLaboratoryError()

    const result = await repository.remove(laboratory)

    return result
}

const listLaboratories = async () => {
    const repository = getRepository(Laboratory)
    const laboratories = repository.find({ where: { status: Status.ACTIVE } })

    return laboratories
}

const getValidLaboratory = async (laboratoryId: number) => {
    const laboratory = await findLaboratory(laboratoryId)

    if (laboratory.status !== Status.ACTIVE)
        throw new InactiveLaboratoryError()

    return laboratory
}

const getListOfValidLaboratories = async (laboratoriesId: number[]): Promise<Laboratory[]> => {
    const laboratories: Laboratory[] = []
    await Promise.all(
        laboratoriesId.map(async (id) => {
            const laboratory = await getValidLaboratory(id).catch(() => null)
            if (laboratory) laboratories.push(laboratory)
        }))

    if (!laboratories.length)
        throw new InvalidLaboratoryError()


    return laboratories
}

const deleteLaboratories = async (laboratoriesId: number[]) => {
    const laboratoryList = await getListOfValidLaboratories(laboratoriesId)

    const laboratories = Promise.all(
        laboratoryList.map(async lab => {
            return await deleteLaboratory(lab.id)
        })
    )

    return laboratories

}

const createLaboratories = async (laboratories: LaboratoryWithoutDefaultFields[]) => {
    const newLaboratories = await Promise.all(
        laboratories.map(async laboratoryData => await createLaboratory(laboratoryData))
    )

    if (!newLaboratories.length)
        throw new InvalidLaboratoryError()

    return newLaboratories
}

const updateLaboratories = async (laboratoriesToUpdate: LaboratoryToUpdate[]) => {
    const laboratories: Laboratory[] = []
    await Promise.all(
        laboratoriesToUpdate.map(async laboratoryData => {
            const laboratory = await updateLaboratory(laboratoryData.id, laboratoryData.data).catch(() => null)
            if (laboratory) laboratories.push(laboratory)
        })
    )

    if (!laboratories.length)
        throw new InvalidLaboratoryError()

    return laboratories
}

export const LaboratoryService = {
    createLaboratory,
    updateLaboratory,
    findLaboratory,
    deleteLaboratory,
    listLaboratories,
    getValidLaboratory,
    getListOfValidLaboratories,
    deleteLaboratories,
    createLaboratories,
    updateLaboratories
}