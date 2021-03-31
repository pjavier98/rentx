import { ICreateCarsDto } from 'modules/cars/dtos/ICreateCars.dto';
import { Car } from 'modules/cars/infra/typeorm/entities/car.entity';

interface ICarsRepository {
  create(data: ICreateCarsDto): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
