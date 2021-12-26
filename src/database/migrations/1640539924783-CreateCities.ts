import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCities1640539924783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cities',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'stateId',
                        type: 'integer',
                        isNullable: false
                    }         
                ],
                foreignKeys: [
                    {
                        name: 'stateId',
                        referencedTableName: 'states',
                        referencedColumnNames: ['id'],
                        columnNames: ['stateId'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cities');
    }

}
