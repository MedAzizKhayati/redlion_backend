import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, Like } from 'typeorm';

import { User } from './user.entity';
import { UserUpdate } from './dto/user-update.dto';
import { UserRoleEnum } from './enums/user-role.enum';
import { UserStatusEnum } from './enums/user-status.enum';
import { paginate } from 'src/utils/helpers';
import { AdminUpdate } from './dto/admin-update.dto';
import { UpdatePass } from 'src/auth/dto/update-pass.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

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
          status: UserStatusEnum.APPROVED,
        });
    }
  }

  async paginate(page = 1, limit = 10, params = {}): Promise<User[]> {
    page = isNaN(page) ? 1 : page;
    limit = isNaN(limit) ? 10 : limit;
    params = params || {};
    return this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: params,
    })
  }

  async findAll(page = 1, limit = 10): Promise<User[]> {
    return this.paginate(page, limit);
  }

  async query(page = 1, limit = 10, query = "", role: UserRoleEnum, status: UserStatusEnum): Promise<User[]> {
    query = query.toString().toLowerCase();
    const qb = this.userRepository.createQueryBuilder("user")
    if (query)
      qb.orWhere("(LOWER(user.name) LIKE :query1", { query1: `% ${query}%` })
        .orWhere("LOWER(user.name) LIKE :query2", { query2: `${query}%` })
        .orWhere("LOWER(user.email) LIKE :query3)", { query3: `${query}%` });
    if (role)
      qb.andWhere("user.role = :role", { role });
    if (status)
      qb.andWhere("user.status = :status", { status });
    return paginate(qb, page, limit).getMany();
  }

  async create(data: Partial<User>): Promise<User> {
    return this.userRepository.save(new User(data));
  }

  async approve(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
        throw new NotFoundException(`There isn't any user with id: ${id}`);
    }

    user.status = UserStatusEnum.APPROVED;

    return this.userRepository.save(user);
  }

  async reject(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }

    user.status = UserStatusEnum.REJECTED;

    return this.userRepository.save(user);
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

  async update(id: number, updates: UserUpdate | AdminUpdate | UpdatePass): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }
    Object.assign(user, updates);

    return this.userRepository.save(user);
  }
}
