import { Request, Response, Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import findAllCategoriesController from '../modules/cars/useCases/findAllCategories';
import importCategoryController from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return findAllCategoriesController().handle(request, response);
});

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  (request: Request, response: Response) => {
    return importCategoryController().handle(request, response);
  },
);

export { categoriesRoutes };
