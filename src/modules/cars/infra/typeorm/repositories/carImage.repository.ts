import { CarImage } from 'modules/cars/infra/typeorm/entities/carImage.entity';
import { ICarsImageRepository } from 'modules/cars/repositories/interfaces/ICarsImage.repository';
import { getRepository, Repository } from 'typeorm';

class CarImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    return this.repository.save(carImage);
  }
}

export { CarImageRepository };
