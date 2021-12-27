import { Router } from 'express';
import { container } from 'tsyringe';
import ListStatesService from '../services/ListStatesService';

const statesRoutes = Router();

statesRoutes.get('/', async (request, response) => {
  try {
    let {name} = request.query;
    const listStates = container.resolve(ListStatesService);

    if(name === undefined) {
      name = '';
    }

    const states = await listStates.execute(name.toString().toUpperCase());
    
    return response.json(states);
  } catch (err) {
    return response.status(400).json({error: err.message}); 
  }

});

export default statesRoutes;