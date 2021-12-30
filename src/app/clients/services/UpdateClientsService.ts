/* eslint-disable eqeqeq */
import { inject, injectable } from 'tsyringe';
import { startOfHour } from 'date-fns';
import AppError from '../../../errors/AppError';
import calcularIdade from '../../../utils/calculateAge';
import IClientsRepository from '../repositories/interface/IClientsRepository';
import ICitiesRepository from '../../cities/repositories/interface/ICitiesRepository';

interface IRequest {
  idClient: number;
  fullName?: string;
  gender?: string;
  birthDate?: Date;
  cityLive?:number;
}

@injectable()
class UpdateClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({
    idClient, fullName, gender, birthDate, cityLive,
  }: IRequest): Promise<any> {
    const client = await this.clientsRepository.findClients(undefined, idClient);
    const clientsList = [];
    if (client.length === 0) {
      throw new AppError('Cliente não encontrado');
    }

    if (fullName) {
      client[0].fullName = fullName.toUpperCase();
    }

    if (gender) {
      client[0].gender = gender.toUpperCase();
    }

    if (birthDate) {
      const birthDateFormat = startOfHour(birthDate);
      client[0].birthDate = birthDateFormat;
      client[0].age = calcularIdade(birthDateFormat);
    }

    if (cityLive) {
      const findCity = await this.citiesRepository.findCityById(cityLive);
      if (findCity.length == 0) {
        throw new AppError('Cidade não encontrada');
      }
      client[0].cityLive = cityLive;
    }

    await this.clientsRepository.save(client);

    const result = await this.clientsRepository.findClients(undefined, idClient);
    clientsList[0] = {
      id: result[0].id,
      fullName: result[0].fullName,
      gender: result[0].gender,
      birthDate: result[0].birthDate,
      age: result[0].age,
      cities: {
        id: result[0].cityLive,
        nameCity: result[0].namecity,
        state: {
          id: result[0].stateId,
          nameState: result[0].namestate,
          acronyms: result[0].acronyms,
        },
      },
    };

    return { clientsList, message: 'Cliente atualizado com sucesso' };
  }
}

export default UpdateClientsService;
