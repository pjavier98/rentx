import { ICreateCarsDto } from 'modules/cars/dtos/ICreateCars.dto';
import { Car } from 'modules/cars/infra/typeorm/entities/car.entity';
import { ICarsRepository } from 'modules/cars/repositories/interfaces/ICars.repository';
import { AppError } from 'shared/errors/app.error';
import { inject, injectable } from 'tsyringe';

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data: ICreateCarsDto): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists');
    }

    return this.carsRepository.create(data);
  }
}

export { CreateCarUseCase };
