import { Request, Response } from 'express';
import { CreateRentalUseCase } from 'modules/rentals/useCases/createRental/createRental.useCase';
import { container } from 'tsyringe';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { expected_return_date, car_id } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id,
      expected_return_date,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
