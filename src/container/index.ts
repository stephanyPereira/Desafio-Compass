import { container } from 'tsyringe';
import CitiesRepository from '../app/cities/repositories/CitiesRepository';
import ICitiesRepositoty from '../app/cities/repositories/interface/ICitiesRepository';

import StatesRepository from '../app/states/repositories/StatesRepository';

container.registerSingleton<StatesRepository>(
  'StatesRepository',
  StatesRepository,
);

container.registerSingleton<ICitiesRepositoty>(
  'CitiesRepository',
  CitiesRepository,
);
