import {container} from 'tsyringe';
import CitiesRepository from '../app/cities/repositories/CitiesRepository';

import StatesRepository from "../app/states/repositories/StatesRepository";

container.registerSingleton<StatesRepository>(
  'StatesRepository',
  StatesRepository,
);

container.registerSingleton<CitiesRepository>(
  'CitiesRepository',
  CitiesRepository,
);
