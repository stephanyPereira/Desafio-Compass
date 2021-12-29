import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const clientsRoutes = Router();
const clientsController = new ClientsController();

clientsRoutes.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required(),
      gender: Joi.string().required(),
      birthDate: Joi.date().required(),
      age: Joi.number().required(),
      cityLive: Joi.number().required(),
    },
  }),
  clientsController.create,
);

clientsRoutes.get('/', clientsController.index);

export default clientsRoutes;
