import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { User } from './user.entity';
import { UserUpdate } from './dto/user-update.dto';
import { UserRoleEnum } from './user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    try {
      await this.findOne({ where: { email: process.env.SUPER_ADMIN_EMAIL } });
    } catch (error) {
      await
        this.create({
          name: process.env.SUPER_ADMIN_NAME || 'Super Admin',
          email: process.env.SUPER_ADMIN_EMAIL,
          password: process.env.SUPER_ADMIN_PASSWORD,
          role: UserRoleEnum.ADMIN,
        });
    }
  }


  async create(data: Partial<User>): Promise<User> {
    return this.userRepository.save(new User(data));
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${JSON.stringify(where)}`,
      );
    }

    return user;
  }

  async update(id: number, updates: UserUpdate): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }
    Object.assign(user, updates);

    return this.userRepository.save(user);
  }
}
