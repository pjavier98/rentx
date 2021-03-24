import { CategoriesRepository } from '../../repositories/implementations/categories.repository';
import { CreateCategoryController } from './createCategory.controller';
import { CreateCategoryUseCase } from './createCategory.useCase';

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  return new CreateCategoryController(createCategoryUseCase);
};
