import { ICreateCarsDto } from 'modules/cars/dtos/ICreateCars.dto';
import { IFindAllCarsDto } from 'modules/cars/dtos/IFindAllCars.dto';
import { Car } from 'modules/cars/infra/typeorm/entities/car.entity';

interface ICarsRepository {
  create(data: ICreateCarsDto): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(filters?: IFindAllCarsDto): Promise<Car[]>;
}

export { ICarsRepository };
