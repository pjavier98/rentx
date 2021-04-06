import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from 'modules/rentals/repositories/in-memory/rentals.repository.inMemory';
import { CreateRentalUseCase } from 'modules/rentals/useCases/createRental/createRental.useCase';
import { DayJSDateProvider } from 'shared/container/providers/dateProvider/implementations/dayjs.dateProvider';
import { AppError } from 'shared/errors/app.error';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJSDateProvider: DayJSDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJSDateProvider = new DayJSDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJSDateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123',
      car_id: '321',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '321',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '987',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open with the same car', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '321',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '678',
        car_id: '321',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if the expected return value is smaller than 24 hours', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '321',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
