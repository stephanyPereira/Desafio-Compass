/* eslint-disable @typescript-eslint/naming-convention */
import { injectable, inject } from 'tsyringe';
import AppError from '../../../errors/AppError';
import Cities from '../models/Cities';
import ICitiesRepository from '../repositories/interface/ICitiesRepository';

interface Request {
  nameCity: string;
  stateId: number;
}

interface IReturnCities {
  city: Cities;
  message: string;
}

@injectable()
class CreateCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ nameCity, stateId }: Request): Promise<IReturnCities> {
    const nameUpper = nameCity.toUpperCase();

    const findCityAndStateIsSame = await this.citiesRepository.findByCityAndState(
      { name: nameUpper, stateId },
    );

    if (findCityAndStateIsSame.length > 0) {
      throw new AppError(`Cidade: ${nameUpper} já está cadastrada para o estado: ${findCityAndStateIsSame[0].acronyms}`);
    }

    const city = await this.citiesRepository.create({ name: nameUpper, stateId });

    await this.citiesRepository.save(city);

    return { city, message: 'Cidade incluida com sucesso' };
  }
}

export default CreateCitiesService;
