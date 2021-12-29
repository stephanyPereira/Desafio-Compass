/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedStates1640538739805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into states("name", acronyms ) values ('ACRE', 'AC'),('ALAGOAS', 'AL'),('AMAZONAS', 'AM'),('AMAPÁ', 'AP'),('BAHIA', 'BA'),('CEARÁ', 'CE'),('DISTRITO FEDERAL', 'DF'),
            ('ESPÍRITO SANTO', 'ES'),('GOIÁS', 'GO'),('MARANHÃO', 'MA'),('MINAS GERAIS', 'MG'),('MATO GROSSO DO SUL', 'MS'),('MATO GROSSO', 'MT'),('PARÁ', 'PA'),('PARAÍBA', 'PB'),
            ('PERNAMBUCO', 'PE'),('PIAUÍ', 'PI'),('PARANÁ', 'PR'),('RIO DE JANEIRO', 'RJ'),('RIO GRANDE DO NORTE', 'RN'),('RONDÔNIA', 'RO'),('RORAIMA', 'RR'),('RIO GRANDE DO SUL', 'RS'),
            ('SANTA CATARINA', 'SC'),('SERGIPE', 'SE'),('SÃO PAULO', 'SP'),('TOCANTINS', 'TO'),('EXTERIOR', 'EX');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM states where id between 1 and 28');
  }
}
