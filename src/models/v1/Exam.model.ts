import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status, ExamType } from "../../utils/v1";
import { Laboratory } from './Laboratory.model';

@Entity('Exam')
export class Exam {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'enum', enum: ExamType })
    type: ExamType

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status

    @ManyToMany(() => Laboratory, laboratory => laboratory.exams, { eager: true })
    @JoinTable({ name: 'Laboratory_has_Exam' })
    laboratories: Laboratory[]


}