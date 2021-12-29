
import { Router } from 'express';
import statesRoutes from '../app/states/routes/states.routes';
import citiesRoutes from '../app/cities/routes/cities.routes';

const routes = Router();

routes.use('/states', statesRoutes);
routes.use('/cities', citiesRoutes);

export default routes;