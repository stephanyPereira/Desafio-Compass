import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('states')
class States {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column()
    acronyms: string;

  @Column()
    name: string;
}

export default States;
