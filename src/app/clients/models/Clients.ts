import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
class Clients {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column()
    fullName: string;

  @Column()
    gender: string;

  @Column()
    birthDate: Date;

  @Column()
    age: number;

  @Column()
    cityLive: number;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}

export default Clients;
