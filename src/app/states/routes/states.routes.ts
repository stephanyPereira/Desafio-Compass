import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import StatesController from '../controllers/StatesController';

const statesController = new StatesController();

const statesRoutes = Router();

statesRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      nameState: Joi.string(),
    },
  }),

  statesController.index,
);

export default statesRoutes;
