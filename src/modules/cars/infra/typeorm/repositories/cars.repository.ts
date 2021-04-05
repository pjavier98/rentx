import { ICreateCarsDto } from 'modules/cars/dtos/ICreateCars.dto';
import { IFindAllCarsDto } from 'modules/cars/dtos/IFindAllCars.dto';
import { Car } from 'modules/cars/infra/typeorm/entities/car.entity';
import { ICarsRepository } from 'modules/cars/repositories/interfaces/ICars.repository';
import { getRepository, Repository } from 'typeorm';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  create(data: ICreateCarsDto): Promise<Car> {
    const car = this.repository.create(data);

    return this.repository.save(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findAvailable(filters?: IFindAllCarsDto): Promise<Car[]> {
    const { name, brand, category_id } = filters;

    const carsQuery = await this.repository
      .createQueryBuilder('car')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('car.name = :name', { name });
    }

    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand });
    }

    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id });
    }

    return carsQuery.getMany();
  }

  findById(car_id: string): Promise<Car> {
    return this.repository.findOne(car_id);
  }
}

export { CarsRepository };
