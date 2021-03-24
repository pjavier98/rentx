import { Category } from '../../entities/category.entity';
import { ICategoriesRepository } from '../../repositories/interfaces/ICategories.repository';

class FindAllCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }
}

export { FindAllCategoriesUseCase };
