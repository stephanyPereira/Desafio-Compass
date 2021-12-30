import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateClientsService from '../services/CreateClientsServices';
import ListClientsService from '../services/ListClientsService';
import RemoveClientsService from '../services/RemoveClientsService';
import UpdateClientsService from '../services/UpdateClientsService';

export default class ClientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      fullName, gender, birthDate, cityLive,
    } = req.body;

    const createdClient = container.resolve(CreateClientsService);

    const client = await createdClient.execute({
      fullName, gender, birthDate, cityLive,
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

  public async update(req: Request, res: Response): Promise<Response> {
    const { idClient } = req.params;
    const {
      fullName, gender, birthDate, cityLive,
    } = req.body;

    const updateClient = container.resolve(UpdateClientsService);

    const client = await updateClient.execute({
      idClient: +idClient, fullName, gender, birthDate, cityLive,
    });

    return res.json(client);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteClient = container.resolve(RemoveClientsService);

    const client = await deleteClient.execute(+id);

    return res.json(client);
  }
}
