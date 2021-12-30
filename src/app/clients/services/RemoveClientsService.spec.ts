import AppError from '../../../errors/AppError';
import FakeCitiesRepository from '../../cities/repositories/fakes/FakeCitiesRepository';
import CreateCitiesService from '../../cities/services/CreateCitiesService';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientsService from './CreateClientsServices';
import RemoveClientsService from './RemoveClientsService';

let fakeClientsRepository: FakeClientsRepository;
let fakeCitiesRepository: FakeCitiesRepository;
let createdClientService: CreateClientsService;
let createCitiesServices: CreateCitiesService;
let removeClientsServices: RemoveClientsService;

describe('RemoveClientsService', () => {
  beforeEach(async () => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeCitiesRepository = new FakeCitiesRepository();
    createdClientService = new CreateClientsService(fakeClientsRepository, fakeCitiesRepository);
    createCitiesServices = new CreateCitiesService(fakeCitiesRepository);
    removeClientsServices = new RemoveClientsService(fakeClientsRepository);

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
  });

  it('must be able to return a removal success message with the client\'s name', async () => {
    await createdClientService.execute({
      fullName: 'Marcelo Bernardy de Azevedo',
      gender: 'Masculino',
      birthDate: new Date(1998, 8, 8),
      cityLive: 1,
    });

    await createdClientService.execute({
      fullName: 'Pietro Freitas Scarsi',
      gender: 'Masculino',
      birthDate: new Date(2008, 6, 18),
      cityLive: 1,
    });

    const removeClient = await removeClientsServices.execute(2);
    expect(removeClient.message).toEqual('Cliente: MARCELO BERNARDY DE AZEVEDO removido com sucesso');
  });

  it('should be able to return an error message if it can\'t find the client', async () => {
    await expect(removeClientsServices.execute(2)).rejects.toBeInstanceOf(AppError);
  });
});
