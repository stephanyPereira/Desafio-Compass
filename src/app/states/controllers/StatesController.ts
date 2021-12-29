import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListStatesService from '../services/ListStatesService';

export default class StatesController {
  public async index(req: Request, res: Response): Promise<Response> {
    let { nameState } = req.query;

    const listStates = container.resolve(ListStatesService);

    if (nameState === undefined) {
      nameState = '';
    }

    const states = await listStates.execute(nameState.toString());

    return res.json(states);
  }
}
