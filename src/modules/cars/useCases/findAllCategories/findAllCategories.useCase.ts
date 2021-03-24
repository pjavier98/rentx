import { Category } from '../../entities/category.model';
import { ICategoriesRepository } from '../../repositories/interfaces/ICategories.repository';

class FindAllCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.findAll();
  }
}

export { FindAllCategoriesUseCase };
