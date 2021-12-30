import AppError from '../../../errors/AppError';
import FakeCitiesRepository from '../../cities/repositories/fakes/FakeCitiesRepository';
import CreateCitiesService from '../../cities/services/CreateCitiesService';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientsService from './CreateClientsServices';
import UpdateCitiesService from './UpdateClientsService';

let fakeClientsRepository: FakeClientsRepository;
let fakeCitiesRepository: FakeCitiesRepository;
let createdClientService: CreateClientsService;
let createCitiesServices: CreateCitiesService;
let updateCitiesServices: UpdateCitiesService;

describe('UpdateClientsService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeCitiesRepository = new FakeCitiesRepository();
    createdClientService = new CreateClientsService(fakeClientsRepository, fakeCitiesRepository);
    createCitiesServices = new CreateCitiesService(fakeCitiesRepository);
    updateCitiesServices = new UpdateCitiesService(fakeClientsRepository);
  });
  it('must be able to update the client', async () => {
    await createCitiesServices.execute({
      name: 'Porto Alegre',
      stateId: 23,
    });

    const client = await createdClientService.execute({
      fullName: 'Stephany dos Santos Pereira',
      gender: 'Feminino',
      birthDate: new Date(2000, 2, 18),
      cityLive: 1,
    });

    const updateClient = await updateCitiesServices.execute({
      idClient: client.client.id, fullName: 'Stephany dos Santos Pereira', gender: 'Feminino', birthDate: new Date(2000, 6, 18), cityLive: 1,
    });
    expect(updateClient.clientsList[0].birthDate).toEqual(new Date('2000-07-18T03:00:00.000Z'));
  });

  it('should be able to return an error if it can\'t find the client.', async () => {
    await expect(updateCitiesServices.execute({
      idClient: 1, fullName: 'Stephany dos Santos Pereira', gender: 'Feminino', birthDate: new Date(2000, 7, 18), cityLive: 1,
    })).rejects.toBeInstanceOf(AppError);
  });
});
