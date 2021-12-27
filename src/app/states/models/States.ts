import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('states')
class Cities {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  acronyms: string;

  @Column()
  name: string;
}

export default Cities;