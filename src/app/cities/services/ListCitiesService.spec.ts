import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import CreateCitiesService from "./CreateCitiesService";
import ListCitiesService from "./ListCitiesService";

let fakeCitiesRepository: FakeCitiesRepository;
let createCitiesServices: CreateCitiesService;
let listCitiesServices: ListCitiesService;

describe('ListCitiesService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    createCitiesServices = new CreateCitiesService(fakeCitiesRepository);
    listCitiesServices = new ListCitiesService(fakeCitiesRepository);
  });

  it(`should be able to return a message if you can't find the city in the bank`, async () => {
    const emptyList = await listCitiesServices.execute('Porto Alegre', '');

    expect(emptyList.message).toEqual('Nenhum resultado foi encontrado para está pesquisa');
  });

  it(`should be able to return a message if you can't find the state in the bank`, async () => {
    const emptyList = await listCitiesServices.execute('', 'Rio Grand');

    expect(emptyList.message).toEqual('Nenhum resultado foi encontrado para está pesquisa');
  });

  it('should be able to return an array containing the cities found in via like', async () => {
    await createCitiesServices.execute({
      name: 'Porto Alegre',
      stateId: 23
    });

    await createCitiesServices.execute({
      name: 'Imbé',
      stateId: 23
    });

    const list = await listCitiesServices.execute('Porto ', '');
    expect(list[0].cidade).toContain('PORTO ALEGRE');
  });

  it(`should be able to return a message if you can't find the city in that state`, async () => {
    await createCitiesServices.execute({
      name: 'Porto Alegre',
      stateId: 23
    });

    await createCitiesServices.execute({
      name: 'Rio Branco',
      stateId: 1
    });

    const list = await listCitiesServices.execute('Porto', 'ACRE');
    expect(list.message).toEqual('Nenhum resultado foi encontrado para está pesquisa')
  });

  it('should be able to return an array containing the states found in via like', async () => {
    await createCitiesServices.execute({
      name: 'Porto Alegre',
      stateId: 23
    });

    await createCitiesServices.execute({
      name: 'Rio Branco',
      stateId: 1
    });

    const list = await listCitiesServices.execute('', 'Rio GRande do sul');
    expect(list[0].estado).toContain('RIO GRANDE DO SUL');
  });

});