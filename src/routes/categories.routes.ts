import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateCategoryService } from '../services/createCategory.service';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const categories = categoriesRepository.findAll();

  return response.json(categories);
});

export { categoriesRoutes };
