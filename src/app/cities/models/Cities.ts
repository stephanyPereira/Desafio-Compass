import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cities')
class Cities {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column()
    name: string;

  @Column()
    stateId: number;
}

export default Cities;
