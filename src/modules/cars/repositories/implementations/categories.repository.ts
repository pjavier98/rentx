import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/category.entity';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../interfaces/ICategories.repository';

class CategoriesRepository implements ICategoriesRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  findByName(name: string): Promise<Category> {
    return this.repository.findOne({ name });
  }
}

export { CategoriesRepository };
