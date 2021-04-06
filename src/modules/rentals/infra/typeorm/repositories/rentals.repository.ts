import { CreateRentalDto } from 'modules/rentals/dtos/createRental.dto';
import { Rental } from 'modules/rentals/infra/typeorm/entities/rental.entity';
import { IRentalsRepository } from 'modules/rentals/repositories/interfaces/IRentals.repository';
import { getRepository, Repository } from 'typeorm';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  create(data: CreateRentalDto): Promise<Rental> {
    const rental = this.repository.create(data);

    return this.repository.save(rental);
  }

  findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id });
  }

  findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id });
  }
}

export { RentalsRepository };
