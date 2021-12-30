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
      cityLive: Joi.number().required(),
    },
  }),
  clientsController.create,
);

clientsRoutes.get('/', clientsController.index);

clientsRoutes.put(
  '/update/:idClient',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string(),
      gender: Joi.string(),
      birthDate: Joi.date(),
      cityLive: Joi.number(),
    },
  }),

  clientsController.update,
);

clientsRoutes.delete('/remove/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), clientsController.delete);

export default clientsRoutes;
