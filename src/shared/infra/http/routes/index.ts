import { Router } from 'express';
import { authenticateRoutes } from 'shared/infra/http/routes//authenticate.routes';
import { carsRoutes } from 'shared/infra/http/routes//cars.routes';
import { categoriesRoutes } from 'shared/infra/http/routes//categories.routes';
import { specificationsRoutes } from 'shared/infra/http/routes//specifications.routes';
import { usersRoutes } from 'shared/infra/http/routes//users.routes';
import { rentalsRoutes } from 'shared/infra/http/routes/rentals.routes';

const routes = Router();

routes.use(authenticateRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/cars', carsRoutes);
routes.use('/rentals', rentalsRoutes);

export { routes };
