import { Category } from '../models/category.model';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategories.repository';

class PostgresCategoriesRepository implements ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO) {
    console.log({ name, description });
  }

  findAll(): Category[] {
    return null;
  }

  findByName(name: string): Category {
    console.log({ name });
    return null;
  }
}

export { PostgresCategoriesRepository };
