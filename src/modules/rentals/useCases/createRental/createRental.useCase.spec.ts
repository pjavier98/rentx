import { RentalsRepositoryInMemory } from 'modules/rentals/repositories/in-memory/rentals.repository.inMemory';
import { CreateRentalUseCase } from 'modules/rentals/useCases/createRental/createRental.useCase';
import { AppError } from 'shared/errors/app.error';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123',
      car_id: '321',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '321',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '987',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open with the same car', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '321',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '678',
        car_id: '321',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
