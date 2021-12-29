import Clients from '../../models/Clients';

interface IClients {
  fullName: string;
  gender: string;
  birthDate: Date;
  age: number;
  cityLive: number;
}

export default interface IClientsRepository {
  create({
    fullName, gender, birthDate, age, cityLive,
  }: IClients): Promise<Clients>;
  save(clients: Clients) : Promise<Clients>;
  // eslint-disable-next-line semi
}
