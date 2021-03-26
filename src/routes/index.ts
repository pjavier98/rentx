import { Router } from 'express';

import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticated.middleware';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use(ensureAuthenticatedMiddleware);
routes.use(authenticateRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);

export { routes };
