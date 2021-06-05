import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Laboratory } from './Laboratory.model';

@Entity('Address')
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    number: string

    @Column()
    street: string

    @Column()
    neighborhood: string

    @Column()
    city: string

    @Column()
    state: string

    @Column({ name: 'postal_code' })
    postalCode: string

    @OneToOne(() => Laboratory, laboratory => laboratory.address, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    laboratory: Laboratory

}