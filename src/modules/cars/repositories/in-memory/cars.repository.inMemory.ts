import { ICreateCarsDto } from 'modules/cars/dtos/ICreateCars.dto';
import { IFindAllCarsDto } from 'modules/cars/dtos/IFindAllCars.dto';
import { Car } from 'modules/cars/infra/typeorm/entities/car.entity';
import { ICarsRepository } from 'modules/cars/repositories/interfaces/ICars.repository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarsDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable({
    category_id,
    name,
    brand,
  }: IFindAllCarsDto): Promise<Car[]> {
    return this.cars.filter(
      car =>
        (!brand && !category_id && !name && (car => car.available === true)) ||
        ((car => car.available === true) &&
          ((brand && car.brand === brand) ||
            (category_id && car.category_id === category_id) ||
            (name && car.name === name))),
    );
  }
}

export { CarsRepositoryInMemory };
