import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class LaboratoryHasExam1622265398128 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Laboratory_has_Exam',
            columns: [
                {
                    name: 'laboratory_id',
                    type: 'INTEGER'
                },
                {
                    name: 'exam_id',
                    type: 'INTEGER'
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['laboratory_id'],
                    referencedTableName: 'Laboratory',
                    referencedColumnNames: ['id']
                },
                {
                    columnNames: ['exam_id'],
                    referencedTableName: 'Exam',
                    referencedColumnNames: ['id']
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Laboratory_has_Exam')
    }

}
