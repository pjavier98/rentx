import { CategoriesRepository } from '../../repositories/implementations/categories.repository';
import { ImportCategoryController } from './importCategory.controller';
import { ImportCategoryUseCase } from './importCategory.useCase';

export default (): ImportCategoryController => {
  const categoriesRepository = new CategoriesRepository();

  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

  return new ImportCategoryController(importCategoryUseCase);
};
