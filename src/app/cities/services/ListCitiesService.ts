import { injectable, inject } from 'tsyringe';
import ICitiesRepository from '../repositories/interface/ICitiesRepository';

@injectable()
class ListCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ){}

  public async execute(city: string, state: string): Promise<any> {

    const listCity = await this.citiesRepository.listCityAndState(city.toUpperCase(), state.toUpperCase());

    if(listCity.length === 0) {
      return {message: 'Nenhum resultado foi encontrado para está pesquisa'};
    }

    return listCity;

  }
}

export default ListCitiesService;