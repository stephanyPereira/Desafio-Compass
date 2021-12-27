import {createQueryBuilder, EntityRepository, getRepository, Like, Repository} from 'typeorm';
import States from '../models/States';

@EntityRepository(States)
class StatesRepository {
  private ormRepository: Repository<States>;

  constructor() {
    this.ormRepository = getRepository(States);
  }

  async findStates(name: string): Promise<any> {
    const listStates = await this.ormRepository.find({where: {name: Like(`%${name}%`)}});
    
    return listStates;
  }
}

export default StatesRepository;
