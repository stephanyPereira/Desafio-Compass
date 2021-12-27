import { injectable, inject } from 'tsyringe';
import CitiesRepository from "../repositories/CitiesRepository";

interface Request {
  name: string;
  stateId: number; 
}

@injectable()
class CreateCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: CitiesRepository,
  ){}
  
  public async execute({name, stateId}: Request): Promise<any> {
    try {

      const findCityAndStateIsSame = await this.citiesRepository.findByCityAndState({name, stateId});

      if(findCityAndStateIsSame.length > 0) {
        return {message: `Cidade: ${name} já está cadastrada para o estado: ${findCityAndStateIsSame[0].acronyms}`};
      }

      const city = await this.citiesRepository.create({name, stateId});

      await this.citiesRepository.save(city);

      return {city, message: 'Cidade incluida com sucesso'};

    } catch (err) {
      return err;
    }
  }
}

export default CreateCitiesService;
