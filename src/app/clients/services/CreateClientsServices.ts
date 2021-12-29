import { inject, injectable } from 'tsyringe';
import { startOfHour } from 'date-fns';
import IClientsRepository from '../repositories/interface/IClientsRepository';
import ICitiesRepository from '../../cities/repositories/interface/ICitiesRepository';
import AppError from '../../../errors/AppError';
import Clients from '../models/Clients';

interface IClients {
  fullName: string;
  gender: string;
  birthDate: Date;
  age: number;
  cityLive: number;
}

interface IReturnClient {
  client: Clients;
  message: string;
}

@injectable()
class CreateClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({
    fullName, gender, birthDate, age, cityLive,
  }: IClients): Promise<IReturnClient> {
    const fullNameUpper = fullName.toUpperCase();
    const genderUpper = gender.toUpperCase();
    const birthDateFormat = startOfHour(birthDate);

    const findCity = await this.citiesRepository.findCityById(cityLive);

    if (findCity.length === 0) {
      throw new AppError('Cidade não encontrada');
    }

    const client = await this.clientsRepository.create({
      fullName: fullNameUpper, gender: genderUpper, birthDate: birthDateFormat, age, cityLive,
    });

    await this.clientsRepository.save(client);

    return { client, message: 'Cliente cadastrado com sucesso' };
  }
}

export default CreateClientsService;
