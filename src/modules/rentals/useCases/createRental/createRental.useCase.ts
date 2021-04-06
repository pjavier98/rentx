import { CreateRentalDto } from 'modules/rentals/dtos/createRental.dto';
import { Rental } from 'modules/rentals/infra/typeorm/entities/rental.entity';
import { IRentalsRepository } from 'modules/rentals/repositories/interfaces/IRentals.repository';
import { IDateProvider } from 'shared/container/providers/dateProvider/IDate.provider';
import { AppError } from 'shared/errors/app.error';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: CreateRentalDto): Promise<Rental> {
    const minimumHoursToRent = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user');
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare < minimumHoursToRent) {
      throw new AppError('The rental has to be minimum 24 hours');
    }

    return this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });
  }
}

export { CreateRentalUseCase };
