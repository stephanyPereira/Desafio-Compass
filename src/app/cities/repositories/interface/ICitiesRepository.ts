/* eslint-disable @typescript-eslint/no-extra-semi */
import ICreateCityDTO from '../../dtos/ICreateCityDTO';
import IListCityAndStateDTO from '../../dtos/IListCityAndStateDTO';
import Cities from '../../models/Cities';

export default interface ICitiesRepository {
  findByCityAndState({ name, stateId }: ICreateCityDTO): Promise<IListCityAndStateDTO[]>;
  listCityAndState(city: string, state: string): Promise<IListCityAndStateDTO[]>;
  findCityById(cityId: number): Promise<Cities[]>;
  create({ name, stateId }: ICreateCityDTO): Promise<Cities>;
  save(city: Cities) : Promise<Cities>;
// eslint-disable-next-line semi
};
