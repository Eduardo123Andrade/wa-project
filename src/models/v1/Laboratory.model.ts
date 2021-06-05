import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from '.';
import { Status } from '../../utils/v1';
import { Address } from './Address.model';

@Entity('Laboratory')
export class Laboratory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status

    @OneToOne(() => Address, address => address.laboratory, {
        eager: true,
        cascade: ['insert', 'update', 'remove'],
    })
    @JoinColumn({name: 'address_id'})
    address: Address

    @ManyToMany(() => Exam, exam => exam.laboratories)
    exams: Exam[]
}