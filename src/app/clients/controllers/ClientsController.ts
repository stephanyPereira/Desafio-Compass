import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateClientsService from '../services/CreateClientsServices';

export default class ClientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      fullName, gender, birthDate, age, cityLive,
    } = req.body;

    const createdClient = container.resolve(CreateClientsService);

    const client = await createdClient.execute({
      fullName, gender, birthDate, age, cityLive,
    });

    return res.json(client);
  }
}
