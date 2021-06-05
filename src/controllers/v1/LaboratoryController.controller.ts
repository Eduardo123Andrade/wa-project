import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { LaboratoryService } from '../../services/v1';


const getActivatedLaboratory = async (_req: Request, res: Response) => {
    const laboratories = await LaboratoryService.listLaboratories()

    return res.status(httpStatus.OK).json({
        laboratories
    })
}

const createLaboratories = async (req: Request, res: Response) => {
    const { laboratories: newLaboratories } = req.body

    const laboratories = await LaboratoryService.createLaboratories(newLaboratories)

    return res.status(httpStatus.CREATED).json({ laboratories })
}

const deleteLaboratories = async (req: Request, res: Response) => {
    const { laboratoriesId } = req.body

    const laboratories = await LaboratoryService.deleteLaboratories(laboratoriesId)

    return res.status(httpStatus.OK).json({ laboratories })

}

const updateLaboratories = async (req: Request, res: Response) => {
    const { laboratories: laboratoriesToUpdate } = req.body

    const laboratories = await LaboratoryService.updateLaboratories(laboratoriesToUpdate)

    return res.status(httpStatus.OK).json({ laboratories })
}

export const LaboratoryController = {
    getActivatedLaboratory,
    deleteLaboratories,
    createLaboratories,
    updateLaboratories
}