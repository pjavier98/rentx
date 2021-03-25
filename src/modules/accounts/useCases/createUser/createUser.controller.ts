import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './createUser.useCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userData = request.body;

    const createUsersUseCase = container.resolve(CreateUserUseCase);

    await createUsersUseCase.execute(userData);

    return response.status(201).send();
  }
}

export { CreateUserController };
