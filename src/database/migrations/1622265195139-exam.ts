import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class exam1622265195139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Exam",
            columns: [
                {
                    name: 'id',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    type: 'INTEGER'
                },
                {
                    name: 'name',
                    type: 'VARCHAR(45)'
                },
                {
                    name: 'type',
                    type: "ENUM('CLINICAL_ANALYSIS', 'IMAGE')"
                },
                {
                    name: 'status',
                    type: "ENUM('ACTIVE', 'INACTIVE')",
                    default: "'ACTIVE'"
                },
 
            ],

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Exam')
    }

}
