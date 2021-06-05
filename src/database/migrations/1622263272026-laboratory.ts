import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class laboratory1622263272026 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Laboratory',
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
                    name: 'status',
                    type: "ENUM('ACTIVE', 'INACTIVE')",
                    default: "'ACTIVE'"
                },
                {
                    name: 'address_id',
                    type: 'INTEGER',
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['address_id'],
                    referencedTableName: 'Address',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Laboratory')
    }

}
