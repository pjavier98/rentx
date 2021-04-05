import { ICreateCarSpecificationDto } from 'modules/cars/dtos/ICreateCarSpecification.dto';
import { Car } from 'modules/cars/infra/typeorm/entities/car.entity';
import { ICarsRepository } from 'modules/cars/repositories/interfaces/ICars.repository';
import { ISpecificationsRepository } from 'modules/cars/repositories/interfaces/ISpecifications.repository';
import { AppError } from 'shared/errors/app.error';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({
    car_id,
    specifications_id,
  }: ICreateCarSpecificationDto): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    carExists.specifications = specifications;

    return this.carsRepository.create(carExists);
  }
}

export { CreateCarSpecificationUseCase };
