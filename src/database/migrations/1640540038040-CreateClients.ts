import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClients1640540038040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clients',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true
                    },
                    {
                        name: 'fullName',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'gender',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'birthDate',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'age',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'cityLive',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'cityLive',
                        referencedTableName: 'cities',
                        referencedColumnNames: ['id'],
                        columnNames: ['cityLive'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients');
    }

}
