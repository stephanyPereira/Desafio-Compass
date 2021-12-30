/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteResult, EntityRepository, getRepository, Repository } from 'typeorm';
import Clients from '../models/Clients';

interface IClients {
  fullName: string;
  gender: string;
  age: number;
  birthDate: Date;
  cityLive: number;
}

interface IReturnClient {
  id: number,
  fullName: string,
  gender: string,
  birthDate: Date,
  age: number,
  cityLive: number,
  namecity: string,
  stateId: number,
  namestate: string,
  acronyms: string
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
    const client = this.ormRepository.create({
      fullName, gender, birthDate, age, cityLive,
    });

    return client;
  }

  async save(clients: Clients): Promise<Clients> {
    const result = await this.ormRepository.save(clients);
    return result;
  }

  async findClients(nameClient?: string, idClient?: number): Promise<IReturnClient[]
  > {
    const getFilters = (filters: any): any => {
      let query = '';
      const bindings = [];
      if (filters.nameClient) {
        query += ` AND cl."fullName" like '%${filters.nameClient}%'`;
      }

      if (filters.idClient) {
        bindings.push(filters.idClient);
        query += ` AND cl.id = $${bindings.length}`;
      }

      return { query, bindings };
    };

    const { query, bindings } = getFilters({ nameClient, idClient });

    const client = await this.ormRepository.query(`select cl.id, cl."fullName", cl.gender, cl."birthDate", cl.age, cl."cityLive", c."name" as nameCity, c."stateId", s."name" as nameState, s.acronyms from clients cl join cities c on cl."cityLive" = c.id join states s on c."stateId" = s.id where 1=1
      ${query} order by cl.id`, bindings);

    return client;
  }

  async removeClient(id: number): Promise<number|null|undefined> {
    const result = await this.ormRepository.createQueryBuilder().delete().from(Clients).where(`id = ${id}`)
      .execute();

      return result.affected

  }
}

export default ClientsRepository;
