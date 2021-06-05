import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class address1622262788210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Address',
            columns: [
                {
                    name: 'id',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    type: 'INTEGER'
                },
                {
                    name: 'number',
                    type: 'VARCHAR(45)',
                },
                {
                    name: 'street',
                    type: 'VARCHAR(45)',
                },
                {
                    name: 'neighborhood',
                    type: 'VARCHAR(45)',
                },
                {
                    name: 'city',
                    type: 'VARCHAR(45)'
                },
                {
                    name: 'state',
                    type: 'VARCHAR(45)',
                },
                {
                    name: 'postal_code',
                    type: 'VARCHAR(8)',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Address')
    }

}
