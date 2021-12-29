import AppError from '../../../errors/AppError';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import CreateCitiesService from './CreateCitiesService';

let fakeCitiesRepository: FakeCitiesRepository;
let createCitiesServices: CreateCitiesService;

describe('CreateCitiesService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    createCitiesServices = new CreateCitiesService(fakeCitiesRepository);
  });

  it('should be able to create a new city', async () => {
    const city = await createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    });

    expect(city.city).toHaveProperty('id');
    expect(city.message).toEqual('Cidade incluida com sucesso');
  });

  it('should be able to return an error if the city is already registered for that state', async () => {
    await createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    });

    await expect(createCitiesServices.execute({
      nameCity: 'Porto Alegre',
      stateId: 23,
    })).rejects.toBeInstanceOf(AppError);
  });
});
