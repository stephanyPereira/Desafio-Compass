/* eslint-disable @typescript-eslint/naming-convention */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Cities from '../models/Cities';

interface Request {
  name: string;
  stateId: number;
}

interface findByCityAndState {
  id: number;
  nameCity: string;
  acronyms: string;
  nameState: string;
}

interface listCityAndState {
  id: number;
  nameCity: string;
  nameState: string;
}

@EntityRepository(Cities)
class CitiesRepository {
  private ormRepository: Repository<Cities>;

  constructor() {
    this.ormRepository = getRepository(Cities);
  }

  async findByCityAndState({ name, stateId }: Request): Promise<findByCityAndState[]> {
    const cityAndState = await this.ormRepository.query(
      `select c.id, c."name", s.acronyms , s."name" from cities c join states s on c."stateId" = s.id where c."name" = '${name}' and s.id = '${stateId}';`,
    );

    return cityAndState;
  }

  async listCityAndState(city: string, state: string): Promise<listCityAndState[]> {
    const cityAndState = await this.ormRepository.query(
      `select c.id, c."name" as cidade, s."name" as estado from cities c join states s on c."stateId" = s.id where c."name" like '%${city}%' and s."name" like '%${state}%' order by s."name", c."name";`,
    );

    return cityAndState;
  }

  async findCityById(cityId: number): Promise<any> {
    const city = await this.ormRepository.find({ where: { id: cityId } });

    return city;
  }

  async create({ name, stateId }: Request): Promise<Cities> {
    const city = await this.ormRepository.create({ name, stateId });

    return city;
  }

  async save(city: Cities) : Promise<Cities> {
    this.ormRepository.save(city);

    return city;
  }
}

export default CitiesRepository;
