import { container } from 'tsyringe';
import CitiesRepository from '../app/cities/repositories/CitiesRepository';
import ICitiesRepositoty from '../app/cities/repositories/interface/ICitiesRepository';
import ClientsRepository from '../app/clients/repositories/ClientsRepository';
import IClientsRepository from '../app/clients/repositories/interface/IClientsRepository';

import StatesRepository from '../app/states/repositories/StatesRepository';

container.registerSingleton<StatesRepository>(
  'StatesRepository',
  StatesRepository,
);

container.registerSingleton<ICitiesRepositoty>(
  'CitiesRepository',
  CitiesRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);
