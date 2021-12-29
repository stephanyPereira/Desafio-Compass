import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateClientsService from '../services/CreateClientsServices';
import ListClientsService from '../services/ListClientsService';

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

  public async index(req: Request, res: Response): Promise<Response> {
    const { nameClient, idClient } = req.query;

    const listClients = container.resolve(ListClientsService);

    const clientsList = await listClients.execute(
      nameClient?.toString().toUpperCase(),
      idClient ? Number(idClient) : undefined,
    );

    return res.json(clientsList);
  }
}
