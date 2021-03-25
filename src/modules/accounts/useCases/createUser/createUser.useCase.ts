import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUser.dto';
import { IUsersRepository } from '../../repositories/interfaces/IUsers.repository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userData: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      userData.email,
    );

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(userData.password, 8);

    await this.usersRepository.create({ ...userData, password: passwordHash });
  }
}

export { CreateUserUseCase };
