import { CategoriesRepository } from '../../repositories/categories.repository';
import { FindAllCategoriesController } from './findAllCategories.controller';
import { FindAllCategoriesUseCase } from './findAllCategories.useCase';

const categoriesRepository = CategoriesRepository.getInstance();

const findAllCategoriesUseCase = new FindAllCategoriesUseCase(
  categoriesRepository,
);

const findAllCategoriesController = new FindAllCategoriesController(
  findAllCategoriesUseCase,
);

export { findAllCategoriesController };
