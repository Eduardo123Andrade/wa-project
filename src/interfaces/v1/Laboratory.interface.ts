import { Status } from 'src/utils/v1';
import { AddressWithoutId } from './Address.interface';

export interface LaboratoryWithoutDefaultFields {
    name: string
    address: AddressWithoutId
}

export interface LaboratoryWithoutIds {
    name: string
    status: Status
    address: AddressWithoutId
}

export interface LaboratoryToUpdate {
    id: number,
    data: LaboratoryWithoutIds
}