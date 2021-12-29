import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCitiesService from '../services/CreateCitiesService';
import ListCitiesService from '../services/ListCitiesService';

export default class CitiesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {nameCity, stateId} = req.body;

    const createdCity = container.resolve(CreateCitiesService);

    const city = await createdCity.execute({
      nameCity,
      stateId
    });

    return res.json(city);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    let {city, state} = req.query;

    const listCity =  container.resolve(ListCitiesService);

    if(city === undefined) {
      city = '';
    } 
    
    if (state === undefined) {
      state = '';
    }

    const retunCity = await listCity.execute(city.toString(), state.toString());

    return res.json(retunCity);
  }
}