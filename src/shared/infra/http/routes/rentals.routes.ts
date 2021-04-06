import { Router } from 'express';
import { CreateRentalController } from 'modules/rentals/useCases/createRental/createRental.controller';
import { ensureAuthenticatedMiddleware } from 'shared/infra/http/middlewares/ensureAuthenticated.middleware';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  createRentalController.handle,
);

export { rentalsRoutes };
