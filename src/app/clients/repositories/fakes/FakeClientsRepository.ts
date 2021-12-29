import Clients from '../../models/Clients';
import IClientsRepository from '../interface/IClientsRepository';

interface IClients {
  fullName: string;
  gender: string;
  birthDate: Date;
  age: number;
  cityLive: number;
}

class FakeClientsRepository implements IClientsRepository {
  private clients: any = [];

  async create({
    fullName, gender, birthDate, age, cityLive,
  }: IClients): Promise<Clients> {
    const client = new Clients();

    Object.assign(client, { id: this.clients.length + 1 }, {
      fullName, gender, birthDate, age, cityLive,
    });

    this.clients.push(client);

    return client;
  }

  async save(client: Clients): Promise<Clients> {
    const findIndex = this.clients.findIndex(
      (findClient: { id: number; }) => findClient.id === client.id,
    );

    this.clients[findIndex] = client;

    return client;
  }
}

export default FakeClientsRepository;
