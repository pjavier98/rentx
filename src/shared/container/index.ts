import { UsersRepository } from 'modules/accounts/infra/typeorm/repositories/users.repository';
import { IUsersRepository } from 'modules/accounts/repositories/interfaces/IUsers.repository';
import { CarsRepository } from 'modules/cars/infra/typeorm/repositories/cars.repository';
import { CarsImagesRepository } from 'modules/cars/infra/typeorm/repositories/carsImages.repository';
import { CategoriesRepository } from 'modules/cars/infra/typeorm/repositories/categories.repository';
import { SpecificationsRepository } from 'modules/cars/infra/typeorm/repositories/specifications.repository';
import { ICarsRepository } from 'modules/cars/repositories/interfaces/ICars.repository';
import { ICarsImagesRepository } from 'modules/cars/repositories/interfaces/ICarsImages.repository';
import { ICategoriesRepository } from 'modules/cars/repositories/interfaces/ICategories.repository';
import { ISpecificationsRepository } from 'modules/cars/repositories/interfaces/ISpecifications.repository';
import { container } from 'tsyringe';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
);
