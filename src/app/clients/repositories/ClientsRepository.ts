import { EntityRepository, getRepository, Repository } from 'typeorm';
import Clients from '../models/Clients';

interface IClients {
  fullName: string;
  gender: string;
  birthDate: Date;
  age: number;
  cityLive: number;
}

@EntityRepository(Clients)
class ClientsRepository {
  private ormRepository: Repository<Clients>;

  constructor() {
    this.ormRepository = getRepository(Clients);
  }

  async create({
    fullName, gender, birthDate, age, cityLive,
  }: IClients): Promise<Clients> {
    const client = await this.ormRepository.create({
      fullName, gender, birthDate, age, cityLive,
    });

    return client;
  }

  async save(clients: Clients): Promise<Clients> {
    this.ormRepository.save(clients);

    return clients;
  }
}

export default ClientsRepository;
