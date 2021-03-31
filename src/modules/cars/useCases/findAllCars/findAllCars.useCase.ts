import { IFindAllCarsDto } from 'modules/cars/dtos/IFindAllCars.dto';
import { Car } from 'modules/cars/infra/typeorm/entities/car.entity';
import { ICarsRepository } from 'modules/cars/repositories/interfaces/ICars.repository';

class FindAllCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute(filters?: IFindAllCarsDto): Promise<Car[]> {
    return this.carsRepository.findAvailable({
      category_id: filters?.category_id || '',
      name: filters?.name || '',
      brand: filters?.brand || '',
    });
  }
}

export { FindAllCarsUseCase };
