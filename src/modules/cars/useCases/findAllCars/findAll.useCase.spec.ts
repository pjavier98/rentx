import { CarsRepositoryInMemory } from 'modules/cars/repositories/in-memory/cars.repository.inMemory';
import { FindAllCarsUseCase } from 'modules/cars/useCases/findAllCars/findAllCars.useCase';

let findAllCarsUseCase: FindAllCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Find All Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    findAllCarsUseCase = new FindAllCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to find all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car 1 Description',
      daily_rate: 140,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car 1 Brand',
      category_id: 'category_id',
    });

    const cars = await findAllCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });

  it('should be able to find all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car 1 Description',
      daily_rate: 140,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car 1 Brand',
      category_id: 'category_id',
    });

    await carsRepositoryInMemory.create({
      name: 'Car with different name',
      description: 'Car Description',
      daily_rate: 140,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'Car Brand',
      category_id: 'category_id',
    });

    const cars = await findAllCarsUseCase.execute({
      name: 'Car 1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to find all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car 1 Description',
      daily_rate: 140,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car 1 Brand',
      category_id: 'category_id',
    });

    await carsRepositoryInMemory.create({
      name: 'Car with different name',
      description: 'Car Description',
      daily_rate: 140,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'Car with different Brand',
      category_id: 'category_id',
    });

    const cars = await findAllCarsUseCase.execute({
      brand: 'Car 1 Brand',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to find all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car 1 Description',
      daily_rate: 140,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car 1 Brand',
      category_id: 'car 1 category_id',
    });

    await carsRepositoryInMemory.create({
      name: 'Car with different name',
      description: 'Car Description',
      daily_rate: 140,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'Car with different Brand',
      category_id: 'car with different category_id',
    });

    const cars = await findAllCarsUseCase.execute({
      category_id: 'car 1 category_id',
    });

    expect(cars).toEqual([car]);
  });
});
