import { Request, Response } from 'express';
import ListStatesService from "../services/ListStatesService";
import { container } from 'tsyringe';

export default class StatesController {
  public async index(req: Request, res: Response): Promise<Response> {
    let {nameState} = req.query;

    const listStates = container.resolve(ListStatesService);

    if(nameState === undefined) {
      nameState = '';
    }

    const states = await listStates.execute(nameState.toString());
    
    return res.json(states);
  }
}