import { CarImage } from 'modules/cars/infra/typeorm/entities/carImage.entity';
import { ICarsImagesRepository } from 'modules/cars/repositories/interfaces/ICarsImages.repository';
import { getRepository, Repository } from 'typeorm';

class CarsImagesRepository implements ICarsImagesRepository {
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

export { CarsImagesRepository };
