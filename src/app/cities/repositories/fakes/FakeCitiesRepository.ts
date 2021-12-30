/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import States from '../../../states/models/States';
import ICreateCityDTO from '../../dtos/ICreateCityDTO';
import IListCityAndStateDTO from '../../dtos/IListCityAndStateDTO';
import Cities from '../../models/Cities';
import ICitiesRepository from '../interface/ICitiesRepository';

class FakeCitiesRepository implements ICitiesRepository {
  private cities: any[] = [];

  private states: any[] = [{
    id: 1,
    acronyms: 'AC',
    name: 'ACRE',
  },
  {
    id: 2,
    acronyms: 'AL',
    name: 'ALAGOAS',
  },
  {
    id: 3,
    acronyms: 'AM',
    name: 'AMAZONAS',
  },
  {
    id: 4,
    acronyms: 'AP',
    name: 'AMAPÁ',
  },
  {
    id: 5,
    acronyms: 'BA',
    name: 'BAHIA',
  },
  {
    id: 6,
    acronyms: 'CE',
    name: 'CEARÁ',
  },
  {
    id: 7,
    acronyms: 'DF',
    name: 'DISTRITO FEDERAL',
  },
  {
    id: 8,
    acronyms: 'ES',
    name: 'ESPÍRITO SANTO',
  },
  {
    id: 9,
    acronyms: 'GO',
    name: 'GOIÁS',
  },
  {
    id: 10,
    acronyms: 'MA',
    name: 'MARANHÃO',
  },
  {
    id: 11,
    acronyms: 'MG',
    name: 'MINAS GERAIS',
  },
  {
    id: 12,
    acronyms: 'MS',
    name: 'MATO GROSSO DO SUL',
  },
  {
    id: 13,
    acronyms: 'MT',
    name: 'MATO GROSSO',
  },
  {
    id: 14,
    acronyms: 'PA',
    name: 'PARÁ',
  },
  {
    id: 15,
    acronyms: 'PB',
    name: 'PARAÍBA',
  },
  {
    id: 16,
    acronyms: 'PE',
    name: 'PERNAMBUCO',
  },
  {
    id: 17,
    acronyms: 'PI',
    name: 'PIAUÍ',
  },
  {
    id: 18,
    acronyms: 'PR',
    name: 'PARANÁ',
  },
  {
    id: 19,
    acronyms: 'RJ',
    name: 'RIO DE JANEIRO',
  },
  {
    id: 20,
    acronyms: 'RN',
    name: 'RIO GRANDE DO NORTE',
  },
  {
    id: 21,
    acronyms: 'RO',
    name: 'RONDÔNIA',
  },
  {
    id: 22,
    acronyms: 'RR',
    name: 'RORAIMA',
  },
  {
    id: 23,
    acronyms: 'RS',
    name: 'RIO GRANDE DO SUL',
  },
  {
    id: 24,
    acronyms: 'SC',
    name: 'SANTA CATARINA',
  },
  {
    id: 25,
    acronyms: 'SE',
    name: 'SERGIPE',
  },
  {
    id: 26,
    acronyms: 'SP',
    name: 'SÃO PAULO',
  },
  {
    id: 27,
    acronyms: 'TO',
    name: 'TOCANTINS',
  },
  {
    id: 28,
    acronyms: 'EX',
    name: 'EXTERIOR',
  }];

  async findByCityAndState({ name, stateId }: ICreateCityDTO): Promise<IListCityAndStateDTO[]> {
    const cityAndState = [];

    const town = [];
    const state = [];

    if (this.cities.length > 0) {
      town[0] = this.cities.find((city:Cities) => city.name === name && city.stateId === stateId);
      state[0] = this.states.find((s:States) => s.id === stateId);

      if (town[0] !== undefined && town.length > 0) {
        cityAndState[0] = {
          id: town[0].id,
          nameCity: town[0].name,
          acronyms: state[0].acronyms,
          nameState: state[0].name,
        };
      }
    }

    return cityAndState;
  }

  async listCityAndState(cityName: string, stateName: string): Promise<IListCityAndStateDTO[]> {
    const citiesSelected = [];

    const town: any[] = [];
    const state: any[] = [];

    if (this.cities.length > 0) {
      if (cityName.length > 0 && stateName.length === 0) {
        town[0] = this.cities.find((city:Cities) => city.name.includes(cityName));
        if (town.length > 0) {
          for (let i = 0; i < town.length; i++) {
            state[i] = this.states.find((s:States) => s.id == town[0].stateId);
            citiesSelected[i] = {
              id: town[i].id,
              nameCity: town[i].name,
              nameState: state[i].name,
            };
          }
        }
      } else if (cityName.length === 0 && stateName.length > 0) {
        state[0] = this.states.find((s:States) => s.name.includes(stateName));
        if (state.length > 0) {
          for (let i = 0; i < state.length; i++) {
            town[i] = this.cities.find((city:Cities) => city.stateId == state[0].id);
            if (town.length > 0) {
              citiesSelected[i] = {
                id: town[i].id,
                nameCity: town[i].name,
                nameState: state[i].name,
              };
            }
          }
        }
      } else if (town.length > 0 && state.length > 0) {
        town[0] = this.cities.find((city:Cities) => city.name.includes(cityName));
        if (town.length > 0) {
          for (let i = 0; i < town.length; i++) {
            state[i] = this.states.find((s:States) => s.id == town[i].statedId);
            citiesSelected[i] = {
              id: town[i].id,
              nameCity: town[i].name,
              nameState: state[i].name,
            };
          }
        }
      }
    }

    return citiesSelected;
  }

  async findCityById(cityId: number): Promise<Cities[]> {
    const town = [];

    if (this.cities.length > 0) {
      if (this.cities.find((city:Cities) => city.id === cityId)) {
        town[0] = this.cities.find((city:Cities) => city.id === cityId);
      }
    }

    return town;
  }

  async create({ name, stateId }: ICreateCityDTO): Promise<Cities> {
    const city = new Cities();

    Object.assign(city, { id: this.cities.length + 1 }, { name, stateId });

    this.cities.push(city);

    return city;
  }

  async save(city: Cities): Promise<Cities> {
    const findIndex = this.cities.findIndex((findCity: { id: number; }) => findCity.id === city.id);

    this.cities[findIndex] = city;

    return city;
  }
}

export default FakeCitiesRepository;
