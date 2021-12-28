import Cities from '../../models/Cities';
import ICitiesRepository from '../interface/ICitiesRepository';

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

class CitiesRepository implements ICitiesRepository  {
  private cities: any = [];
  private states: any = [ {
    "id": 1,
    "acronyms": "AC",
    "name": "ACRE"
  },
  {
    "id": 2,
    "acronyms": "AL",
    "name": "ALAGOAS"
  },
  {
    "id": 3,
    "acronyms": "AM",
    "name": "AMAZONAS"
  },
  {
    "id": 4,
    "acronyms": "AP",
    "name": "AMAPÁ"
  },
  {
    "id": 5,
    "acronyms": "BA",
    "name": "BAHIA"
  },
  {
    "id": 6,
    "acronyms": "CE",
    "name": "CEARÁ"
  },
  {
    "id": 7,
    "acronyms": "DF",
    "name": "DISTRITO FEDERAL"
  },
  {
    "id": 8,
    "acronyms": "ES",
    "name": "ESPÍRITO SANTO"
  },
  {
    "id": 9,
    "acronyms": "GO",
    "name": "GOIÁS"
  },
  {
    "id": 10,
    "acronyms": "MA",
    "name": "MARANHÃO"
  },
  {
    "id": 11,
    "acronyms": "MG",
    "name": "MINAS GERAIS"
  },
  {
    "id": 12,
    "acronyms": "MS",
    "name": "MATO GROSSO DO SUL"
  },
  {
    "id": 13,
    "acronyms": "MT",
    "name": "MATO GROSSO"
  },
  {
    "id": 14,
    "acronyms": "PA",
    "name": "PARÁ"
  },
  {
    "id": 15,
    "acronyms": "PB",
    "name": "PARAÍBA"
  },
  {
    "id": 16,
    "acronyms": "PE",
    "name": "PERNAMBUCO"
  },
  {
    "id": 17,
    "acronyms": "PI",
    "name": "PIAUÍ"
  },
  {
    "id": 18,
    "acronyms": "PR",
    "name": "PARANÁ"
  },
  {
    "id": 19,
    "acronyms": "RJ",
    "name": "RIO DE JANEIRO"
  },
  {
    "id": 20,
    "acronyms": "RN",
    "name": "RIO GRANDE DO NORTE"
  },
  {
    "id": 21,
    "acronyms": "RO",
    "name": "RONDÔNIA"
  },
  {
    "id": 22,
    "acronyms": "RR",
    "name": "RORAIMA"
  },
  {
    "id": 23,
    "acronyms": "RS",
    "name": "RIO GRANDE DO SUL"
  },
  {
    "id": 24,
    "acronyms": "SC",
    "name": "SANTA CATARINA"
  },
  {
    "id": 25,
    "acronyms": "SE",
    "name": "SERGIPE"
  },
  {
    "id": 26,
    "acronyms": "SP",
    "name": "SÃO PAULO"
  },
  {
    "id": 27,
    "acronyms": "TO",
    "name": "TOCANTINS"
  },
  {
    "id": 28,
    "acronyms": "EX",
    "name": "EXTERIOR"
  }]


  async findByCityAndState({name, stateId}: Request): Promise<findByCityAndState[]> {
    let cityAndState = [];

    let city = [];
    let state = [];

    if(this.cities.length > 0) {
      city[0] = this.cities.find((city:any) => city.name === name && city.stateId === stateId);
      state[0] = this.states.find((state:any) => state.id === stateId);

       if(city[0] !== undefined && city.length > 0) {
        cityAndState[0] = {
          id: city[0].id, 
          nameCity: city[0].name,
          acronyms: state[0].acronyms, 
          nameState: state[0].name
        }
      }
    }
      
    return cityAndState;
  }

  async listCityAndState(cityName: string, stateName: string): Promise<any> {

    let citiesSelected = [];

    let city: any[] = [];
    let state: any[] = [];

    if(this.cities.length > 0) {

      if(cityName.length > 0 && stateName.length === 0) {
        city[0] = this.cities.find((city:any) => city.name.includes(cityName));
        if(city.length > 0) {
          for(let i = 0; i < city.length; i++) {
            state[i] = this.states.find((state:any) => state.id == city[0].stateId);
            citiesSelected[i] = {
              id:city[i].id,
              cidade: city[i].name,
              estado: state[i].name
            }
          }
        }    
      } else if(cityName.length === 0 && stateName.length > 0) {
        state[0] = this.states.find((state:any) => state.name.includes(stateName));
        if(state.length > 0) {
          for(let i = 0; i < state.length; i++) {
            city[i] = this.cities.find((city:any) => city.stateId == state[0].id);
            if(city.length > 0) {
              citiesSelected[i] = {
                id:city[i].id,
                cidade: city[i].name,
                estado: state[i].name
              }
            }
          }
        }
      } else if(city.length > 0 && state.length > 0) {
        city[0] = this.cities.find((city:any) => city.name.includes(cityName));
        if(city.length > 0) {
          for(let i = 0; i < city.length; i++) {
            state[i] = this.states.find((state:any) => state.id == city[i].statedId);
            citiesSelected[i] = {
              id:city[i].id,
              cidade: city[i].name,
              estado: state[i].name
            }
          }
        }
      }
    }
    
    return citiesSelected;
  }

  async create({name, stateId}: Request): Promise<Cities> {
    const city = new Cities();

    Object.assign(city, { id: this.cities.length + 1}, {name, stateId});

    this.cities.push(city);

    return city;
  }

  async save(city: Cities) : Promise<Cities> {
    const findIndex = this.cities.findIndex((findCity: { id: number; }) => findCity.id === city.id);

    this.cities[findIndex] = city;

    return city;
  }
}

export default CitiesRepository;