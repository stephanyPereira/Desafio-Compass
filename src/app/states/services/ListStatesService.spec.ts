import { createConnection, getConnection } from "typeorm";
import ListStatesService from "./ListStatesService";
import { container } from 'tsyringe';
import StatesRepository from "../repositories/StatesRepository";

let listStates: ListStatesService;
let statesRepository: StatesRepository;

describe('ListStates', () => {
  const state = [{
    "id": 8,
    "acronyms": "ES",
    "name": "ESPÍRITO SANTO"
  }];

  beforeAll(async () => {
    await createConnection();
    jest.setTimeout(9000000);
    statesRepository = new StatesRepository();
    listStates = new ListStatesService(statesRepository);
  });

  afterAll(async () => {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();
  });

  it('should be able to list the states without any parameters', async () => {   
    const states = await listStates.execute('');

    expect(states.state).toHaveLength(28);
  });

  it('should be able to list the state by passing the piece of its name', async () => {
    const states = await listStates.execute('ESP');

    expect(states.state).toEqual(state);
  });

  it('should be able to list the state by passing your name', async () => {
    const states = await listStates.execute('ESPÍRITO SANTO');

    expect(states.state).toEqual(state);
  });

  it('must be able to display a message if the sent parameter does not find any data in the database', async () => {   
    const states = await listStates.execute('esspírito santo');

    expect(states).toEqual({message: 'Estado não encontrado. Por favor verifique o que foi enviado'});
  });
})