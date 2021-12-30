import { inject, injectable } from 'tsyringe';
import AppError from '../../../errors/AppError';
import IClientsRepository from '../repositories/interface/IClientsRepository';

@injectable()
class RemoveClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(id: number): Promise<any> {
    const client = await this.clientsRepository.findClients(undefined, id);

    if (client.length === 0) {
      throw new AppError('Cliente não encontrado');
    }

    await this.clientsRepository.removeClient(id);

    return { message: `Cliente: ${client[0].fullName} removido com sucesso` };
  }
}

export default RemoveClientsService;
