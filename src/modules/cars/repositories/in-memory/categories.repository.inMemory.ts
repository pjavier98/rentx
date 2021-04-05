import { Category } from '../../infra/typeorm/entities/category.entity';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../interfaces/ICategories.repository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name);
  }
}

export { CategoriesRepositoryInMemory };
