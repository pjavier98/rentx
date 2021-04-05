import uploadConfig from 'configs/upload.config';
import { Router } from 'express';
import { CreateCarController } from 'modules/cars/useCases/createCar/createCar.controller';
import { CreateCarSpecificationController } from 'modules/cars/useCases/createCarSpecification/createCarSpecification.controller';
import { FindAllAvailableCarsController } from 'modules/cars/useCases/findAllAvailableCars/findAllAvailableCars.controller';
import { UploadCarImagesController } from 'modules/cars/useCases/uploadCarImages/uploadCarImages.controller';
import multer from 'multer';
import { ensureAdmin } from 'shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticatedMiddleware } from 'shared/infra/http/middlewares/ensureAuthenticated.middleware';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const findAllAvailableCarsController = new FindAllAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', findAllAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticatedMiddleware,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticatedMiddleware,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
