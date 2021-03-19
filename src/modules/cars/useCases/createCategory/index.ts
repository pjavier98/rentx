import { CategoriesRepository } from '../../repositories/categories.repository';
import { CreateCategoryController } from './createCategory.controller';
import { CreateCategoryUseCase } from './createCategory.useCase';

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

export { createCategoryController };
