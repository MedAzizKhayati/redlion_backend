import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { UserRoleEnum } from './user-role.enum';
import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { TimestampEntities } from 'src/generics/timestamp.entity';

@Entity()
export class User extends TimestampEntities {

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;

  constructor(data: Partial<User> = {}) {
    super();
    Object.assign(this, data);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    if (!/^\$2a\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
