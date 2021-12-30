/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
import { inject, injectable } from 'tsyringe';
import AppError from '../../../errors/AppError';
import IClientsRepository from '../repositories/interface/IClientsRepository';

interface IReturnClient {
  id: number,
  fullName: string,
  gender: string,
  birthDate: Date,
  age: number,
  cities: {
    id: number,
    namecity: string,
    state: {
      stateId: number,
      nameState: string,
      acronyms: string
    }
  }
}

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(nameClient?: string, idClient?: number): Promise<IReturnClient[]> {
    const clientsList: any = [];
    const clients = await this.clientsRepository.findClients(nameClient?.toUpperCase(), idClient);

    if (clients.length === 0) {
      throw new AppError('Nenhum dado foi encontrado');
    }

    for (let i = 0; i < clients.length; i++) {
      clientsList[i] = {
        id: clients[i].id,
        fullName: clients[i].fullName,
        gender: clients[i].gender,
        birthDate: clients[i].birthDate,
        age: clients[i].age,
        cities: {
          id: clients[i].cityLive,
          nameCity: clients[i].namecity,
          state: {
            id: clients[i].stateId,
            nameState: clients[i].namestate,
            acronyms: clients[i].acronyms,
          },
        },
      };
    }

    return clientsList;
  }
}

export default ListClientsService;
