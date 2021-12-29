/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable @typescript-eslint/naming-convention */
import Cities from '../../models/Cities';

interface Request {
  name: string;
  stateId: number;
}
interface findByCityAndState {
  id: number;
  nameCity: string;
  acronyms: string;
  nameState: string;
}
interface listCityAndState {
  id: number;
  nameCity: string;
  nameState: string;
}

export default interface ICitiesRepository {
  findByCityAndState({ name, stateId }: Request): Promise<findByCityAndState[]>;
  listCityAndState(city: string, state: string): Promise<listCityAndState[]>;
  create({ name, stateId }: Request): Promise<Cities>;
  save(city: Cities) : Promise<Cities>;
// eslint-disable-next-line semi
};
