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
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export default Clients;
