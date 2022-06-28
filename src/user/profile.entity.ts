import { TimestampEntities } from 'src/generics/timestamp.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Profile extends TimestampEntities {
  @Column()
  phone: string;

  @Column('date')
  birthday: Date;

  @Column()
  website: string;

  @Column()
  occupation: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
