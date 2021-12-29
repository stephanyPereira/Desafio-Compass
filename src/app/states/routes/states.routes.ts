import { Router } from 'express';
import { container } from 'tsyringe';
import ListStatesService from '../services/ListStatesService';

const statesRoutes = Router();

statesRoutes.get('/', async (request, response) => {
  try {
    let {nameState} = request.query;
    const listStates = container.resolve(ListStatesService);

    if(nameState === undefined) {
      nameState = '';
    }

    const states = await listStates.execute(nameState.toString());
    
    return response.json(states);
  } catch (err: any) {
    return response.status(400).json({error: err.message}); 
  }

});

export default statesRoutes;