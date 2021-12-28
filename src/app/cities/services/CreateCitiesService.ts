import { injectable, inject } from 'tsyringe';
import ICitiesRepository from '../repositories/interface/ICitiesRepository';

interface Request {
  name: string;
  stateId: number; 
}

@injectable()
class CreateCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ){}
  
  public async execute({name, stateId}: Request): Promise<any> {

    const nameUpper = name.toUpperCase();

    const findCityAndStateIsSame = await this.citiesRepository.findByCityAndState({name: nameUpper, stateId});

    if(findCityAndStateIsSame.length > 0) {
      return {message: `Cidade: ${nameUpper} já está cadastrada para o estado: ${findCityAndStateIsSame[0].acronyms}`};
    }

    const city = await this.citiesRepository.create({name: nameUpper, stateId});

    await this.citiesRepository.save(city);

    return {city, message: 'Cidade incluida com sucesso'};

  }
}

export default CreateCitiesService;
