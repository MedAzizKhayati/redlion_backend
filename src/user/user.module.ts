import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { ProfileController } from './controllers/profile.controller';
import { UserService } from './user.service';
import { IsUserAlreadyExist } from './is-user-already-exist.validator';
import { Profile } from './profile.entity';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [ProfileController, UserController],
  providers: [UserService, IsUserAlreadyExist],
  exports: [UserService],
})
export class UserModule {}
