import { IUploadCarImagesDto } from 'modules/cars/dtos/IUploadCarImages.dto';
import { CarsImagesRepository } from 'modules/cars/infra/typeorm/repositories/carsImages.repository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: CarsImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IUploadCarImagesDto): Promise<void> {
    await Promise.all(
      images_name.map(async image =>
        this.carsImagesRepository.create(car_id, image),
      ),
    );
  }
}

export { UploadCarImagesUseCase };
