import { Router } from 'express';
import statesRoutes from '../app/states/routes/states.routes';
import citiesRoutes from '../app/cities/routes/cities.routes';
import clientsRoutes from '../app/clients/routes/clients.routes';

const routes = Router();

routes.use('/states', statesRoutes);
routes.use('/cities', citiesRoutes);
routes.use('/clients', clientsRoutes);

export default routes;
