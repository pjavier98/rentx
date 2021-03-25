import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUser.dto';
import { User } from '../../entities/user.entity';
import { IUsersRepository } from '../interfaces/IUsers.repository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(userData: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(userData);

    await this.repository.save(user);
  }
}

export { UsersRepository };
