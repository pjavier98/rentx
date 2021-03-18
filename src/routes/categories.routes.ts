import { Router, Request, Response } from 'express';

import { CategoriesRepository } from '../repositories/categories.repository';

const categoriesRoutes = Router();
const categoryRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  categoryRepository.create({
    name,
    description,
  });

  return response.status(201).send();
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const categories = categoryRepository.findAll();

  return response.json(categories);
});

export { categoriesRoutes };
