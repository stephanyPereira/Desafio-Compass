import { injectable, inject } from 'tsyringe';
import CitiesRepository from "../repositories/CitiesRepository";

@injectable()
class ListCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: CitiesRepository,
  ){}

  public async execute(city: string, state: string): Promise<any> {
    try {
      const listCity = await this.citiesRepository.listCityAndState(city, state);

      if(listCity.length === 0) {
        return {message: 'Cidade não encontrada'};
      }

      return listCity;
      
    } catch (err) {
      return err;
    }
  }
}

export default ListCitiesService;