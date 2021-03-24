import { Request, Response } from 'express';

import { FindAllCategoriesUseCase } from './findAllCategories.useCase';

class FindAllCategoriesController {
  constructor(private findAllCategoriesUseCase: FindAllCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.findAllCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { FindAllCategoriesController };
