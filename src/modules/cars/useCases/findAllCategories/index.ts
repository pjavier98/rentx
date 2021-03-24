import { CategoriesRepository } from '../../repositories/implementations/categories.repository';
import { FindAllCategoriesController } from './findAllCategories.controller';
import { FindAllCategoriesUseCase } from './findAllCategories.useCase';

export default (): FindAllCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const findAllCategoriesUseCase = new FindAllCategoriesUseCase(
    categoriesRepository,
  );

  return new FindAllCategoriesController(findAllCategoriesUseCase);
};
