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
  private clients: any[] = [];

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

  async findClients(nameClient?: string, idClient?: number): Promise<any> {
    const clientsList: any = [];

    if (this.clients.length > 0) {
      if (nameClient && idClient) {
        if (this.clients.find(
          (client:Clients) => client.fullName.includes(nameClient) && client.id === idClient,
        )
        ) {
          clientsList[0] = this.clients.find(
            (client:Clients) => client.fullName.includes(nameClient) && client.id === idClient,
          );
        }
      } else if (nameClient) {
        if (this.clients.find((client:Clients) => client.fullName.includes(nameClient))) {
          clientsList[0] = this.clients.find(
            (client:Clients) => client.fullName.includes(nameClient),
          );
        }
      } else if (idClient) {
        if (this.clients.find((client:Clients) => client.id === idClient)) {
          clientsList[0] = this.clients.find(
            (client:Clients) => client.id === idClient,
          );
        }
      }
    }

    return clientsList;
  }

  async removeClient(id: number): Promise<number|null|undefined> {
    const findIndex = this.clients.findIndex(
      (findClient: { id: number; }) => findClient.id === id,
    );

    if (!findIndex) {
      return undefined;
    }

    const splice = this.clients.splice(findIndex, 1);

    return splice ? splice.length : null;
  }
}

export default FakeClientsRepository;
