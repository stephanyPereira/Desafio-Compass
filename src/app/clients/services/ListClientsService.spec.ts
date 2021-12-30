import AppError from '../../../errors/AppError';
import FakeCitiesRepository from '../../cities/repositories/fakes/FakeCitiesRepository';
import CreateCitiesService from '../../cities/services/CreateCitiesService';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientsService from './CreateClientsServices';
import ListClientsService from './ListClientsService';

let fakeClientsRepository: FakeClientsRepository;
let fakeCitiesRepository: FakeCitiesRepository;
let createdClientService: CreateClientsService;
let createCitiesServices: CreateCitiesService;
let listClientService: ListClientsService;

describe('ListClientsService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeCitiesRepository = new FakeCitiesRepository();
    createdClientService = new CreateClientsService(fakeClientsRepository, fakeCitiesRepository);
    createCitiesServices = new CreateCitiesService(fakeCitiesRepository);
    listClientService = new ListClientsService(fakeClientsRepository);
  });

  it('must be able to return the list with clients', async () => {
    await createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    });

    await createdClientService.execute({
      fullName: 'Stephany dos Santos Pereira',
      gender: 'Feminino',
      birthDate: new Date(2000, 2, 18),
      cityLive: 1,
    });

    const list = await listClientService.execute('Ste', 1);
    expect(list[0].fullName).toEqual('STEPHANY DOS SANTOS PEREIRA');
    expect(list[0].id).toEqual(1);
  });

  it('must be able to return a message if the data cannot be found in the database v1', async () => {
    await createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    });

    await createdClientService.execute({
      fullName: 'Stephany dos Santos Pereira',
      gender: 'Feminino',
      birthDate: new Date(2000, 2, 18),
      cityLive: 1,
    });
    await expect(listClientService.execute(undefined, 2)).rejects.toBeInstanceOf(AppError);
  });

  it('must be able to return a message if the data cannot be found in the database v2', async () => {
    await createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    });

    await createdClientService.execute({
      fullName: 'Stephany dos Santos Pereira',
      gender: 'Feminino',
      birthDate: new Date(2000, 2, 18),
      cityLive: 1,
    });
    await expect(listClientService.execute('Marcelo', undefined)).rejects.toBeInstanceOf(AppError);
  });
});
