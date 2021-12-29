import { injectable, inject } from 'tsyringe';
import AppError from '../../../errors/AppError';
import ICitiesRepository from '../repositories/interface/ICitiesRepository';

interface IListCityAndState {
  id: number;
  nameCity: string;
  nameState: string;
}

@injectable()
class ListCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(city: string, state: string): Promise<IListCityAndState[]> {
    const listCity = await this.citiesRepository.listCityAndState(
      city.toUpperCase(),
      state.toUpperCase(),
    );

    if (listCity.length === 0) {
      throw new AppError('Nenhum resultado foi encontrado');
    }

    return listCity;
  }
}

export default ListCitiesService;
