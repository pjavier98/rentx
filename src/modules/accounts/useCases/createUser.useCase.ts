import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../dtos/ICreateUser.dto';
import { IUsersRepository } from '../repositories/interfaces/IUsers.repository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userData: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create(userData);
  }
}

export { CreateUserUseCase };
