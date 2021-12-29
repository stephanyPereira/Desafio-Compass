import AppError from '../../../errors/AppError';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import CreateCitiesService from './CreateCitiesService';
import ListCitiesService from './ListCitiesService';

let fakeCitiesRepository: FakeCitiesRepository;
let createCitiesServices: CreateCitiesService;
let listCitiesServices: ListCitiesService;

describe('ListCitiesService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    createCitiesServices = new CreateCitiesService(fakeCitiesRepository);
    listCitiesServices = new ListCitiesService(fakeCitiesRepository);
  });

  it('should be able to return a message if you can\'t find the city in the bank', async () => {
    await expect(listCitiesServices.execute('Porto Alegre', '')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return a message if you can\'t find the state in the bank', async () => {
    await expect(listCitiesServices.execute('', 'Rio Grand')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return an array containing the cities found in via like', async () => {
    await createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    });

    await createCitiesServices.execute({
      nameCity: 'Imbé',
      stateId: 23,
    });

    const list = await listCitiesServices.execute('Porto ', '');
    expect(list[0].cidade).toContain('PORTO ALEGRE');
  });

  it('should be able to return a message if you can\'t find the city in that state', async () => {
    await createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    });

    await createCitiesServices.execute({
      nameCity: 'Rio Branco',
      stateId: 1,
    });

    await expect(listCitiesServices.execute('Porto', 'ACRE')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return an array containing the states found in via like', async () => {
    await createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    });

    await createCitiesServices.execute({
      nameCity: 'Rio Branco',
      stateId: 1,
    });

    const list = await listCitiesServices.execute('', 'Rio GRande do sul');
    expect(list[0].estado).toContain('RIO GRANDE DO SUL');
  });
});
