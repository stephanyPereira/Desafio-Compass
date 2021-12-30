import AppError from '../../../errors/AppError';
import FakeCitiesRepository from '../../cities/repositories/fakes/FakeCitiesRepository';
import CreateCitiesService from '../../cities/services/CreateCitiesService';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientsService from './CreateClientsServices';

let fakeClientsRepository: FakeClientsRepository;
let fakeCitiesRepository: FakeCitiesRepository;
let createdClientService: CreateClientsService;
let createCitiesServices: CreateCitiesService;

describe('CreateClientsService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeCitiesRepository = new FakeCitiesRepository();
    createdClientService = new CreateClientsService(fakeClientsRepository, fakeCitiesRepository);
    createCitiesServices = new CreateCitiesService(fakeCitiesRepository);
  });

  it('should be able to create a new client', async () => {
    await createCitiesServices.execute({
      name: 'Porto Alegre',
      stateId: 23,
    });

    const client = await createdClientService.execute({
      fullName: 'Stephany dos Santos Pereira',
      gender: 'Feminino',
      birthDate: new Date(2000, 3, 18),
      cityLive: 1,
    });

    expect(client.client.id).toEqual(1);
    expect(client.message).toEqual('Cliente cadastrado com sucesso');
  });

  it('must be able to return a message if the city is not found', async () => {
    await expect(createdClientService.execute({
      fullName: 'Stephany dos Santos Pereira',
      gender: 'Feminino',
      birthDate: new Date(2000, 3, 18),
      cityLive: 1,
    })).rejects.toBeInstanceOf(AppError);
  });
});
