import { Router } from 'express';
import CreateCitiesService from '../services/CreateCitiesService';
import ListCitiesService from '../services/ListCitiesService';

import { container } from 'tsyringe';

const citiesRoutes = Router();

citiesRoutes.post('/', async (request, response) => {
  try {
    let {nameCity, stateId} = request.body;

    const createdCity = container.resolve(CreateCitiesService);

    const city = await createdCity.execute({
      nameCity,
      stateId
    });

    return response.json(city)

  } catch (err: any) {
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

    const retunCity = await listCity.execute(city.toString(), state.toString());

    return response.json(retunCity);

  } catch (err: any) {
    return response.status(400).json({error: err});
  }
})

export default citiesRoutes;