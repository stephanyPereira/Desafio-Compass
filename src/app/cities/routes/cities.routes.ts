import { Router } from 'express';
import CreateCitiesService from '../services/CreateCitiesService';
import ListCitiesService from '../services/ListCitiesService';

import { container } from 'tsyringe';

const citiesRoutes = Router();

citiesRoutes.post('/', async (request, response) => {
  try {
    let {name, stateId} = request.body;

    const createdCity = container.resolve(CreateCitiesService);

    name = name.toUpperCase();

    const city = await createdCity.execute({
      name,
      stateId
    });

    return response.json(city)

  } catch (err) {
    return response.status(400).json({error: err.message});
  }

});

citiesRoutes.get('/', async (request, response) => {
  try {
    let {city, state} = request.query;

    const listCity =  container.resolve(ListCitiesService);

    if(city === undefined) {
      city = '';
    } 
    
    if (state === undefined) {
      state = '';
    }

    const retunCity = await listCity.execute(city.toString().toUpperCase(), state.toString().toUpperCase());

    return response.json(retunCity);

  } catch (err) {
    return response.status(400).json({error: err});
  }
})

export default citiesRoutes;