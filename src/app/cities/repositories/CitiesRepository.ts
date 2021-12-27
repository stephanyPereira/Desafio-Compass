import Cities from '../models/Cities';
import {EntityRepository, getRepository, Repository} from 'typeorm';

interface Request {
  name: string;
  stateId: number; 
}

@EntityRepository(Cities)
class CitiesRepository  {
  private ormRepository: Repository<Cities>;

  constructor() {
    this.ormRepository = getRepository(Cities);
  }

  async findByCityAndState({name, stateId}: Request): Promise<any> {

    const cityAndState = await this.ormRepository.query(
      `select c.id, c."name", s.acronyms , s."name" from cities c join states s on c."stateId" = s.id where c."name" = '${name}' and s.id = '${stateId}';`,
    );

    return cityAndState;
  }

  async listCityAndState(city: string, state: string): Promise<any> {

    const cityAndState = await this.ormRepository.query(
      `select c.id, c."name" as cidade, s."name" as estado from cities c join states s on c."stateId" = s.id where c."name" like '%${city}%' and s."name" like '%${state}%' order by s."name", c."name";`,
    );

    return cityAndState;
  }

  async create({name, stateId}: Request): Promise<Cities> {
    const city = await this.ormRepository.create({name, stateId});

    return city;
  }

  async save(city: Cities) : Promise<Cities> {
    this.ormRepository.save(city);

    return city;
  }
}

export default CitiesRepository;