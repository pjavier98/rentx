import { Request, Response } from 'express';
import { CreateCarSpecificationUseCase } from 'modules/cars/useCases/createCarSpecification/createCarSpecification.useCase';
import { container } from 'tsyringe';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    return response.json(specificationCar);
  }
}

export { CreateCarSpecificationController };
