import { Request, Response } from 'express';
import { UploadCarImagesUseCase } from 'modules/cars/useCases/uploadCarImages/uploadCarImages.useCase';
import { container } from 'tsyringe';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const filenames = images.map(file => file.filename);

    await uploadCarImageUseCase.execute({
      car_id,
      images_name: filenames,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
