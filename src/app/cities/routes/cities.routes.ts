import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CitiesController from '../controllers/CitiesController';

const citiesRoutes = Router();

const citiesController = new CitiesController();

citiesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nameCity: Joi.string().required(),
      stateId: Joi.number().required(),
    },
  }),
  citiesController.create,
);

citiesRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      city: Joi.string(),
      state: Joi.string(),
    },
  }),

  citiesController.index,
);

export default citiesRoutes;
