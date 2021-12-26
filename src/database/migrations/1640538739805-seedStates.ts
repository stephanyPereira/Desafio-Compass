import {MigrationInterface, QueryRunner} from "typeorm";

export class seedStates1640538739805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `insert into states("name", acronyms ) values ('Acre', 'AC'),('Alagoas', 'AL'),('Amazonas', 'AM'),('Amapá', 'AP'),('Bahia', 'BA'),('Ceará', 'CE'),('Distrito Federal', 'DF'),
            ('Espírito Santo', 'ES'),('Goiás', 'GO'),('Maranhão', 'MA'),('Minas Gerais', 'MG'),('Mato Grosso do Sul', 'MS'),('Mato Grosso', 'MT'),('Pará', 'PA'),('Paraíba', 'PB'),
            ('Pernambuco', 'PE'),('Piauí', 'PI'),('Paraná', 'PR'),('Rio de Janeiro', 'RJ'),('Rio Grande do Norte', 'RN'),('Rondônia', 'RO'),('Roraima', 'RR'),('Rio Grande do Sul', 'RS'),
            ('Santa Catarina', 'SC'),('Sergipe', 'SE'),('São Paulo', 'SP'),('Tocantins', 'TO'),('Exterior', 'EX');`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM states where id between 1 and 28');
    }

}
