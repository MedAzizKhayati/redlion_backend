import {
  Controller,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  ParseIntPipe,
  Put,
  Body,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from '../user.service';
import { UserUpdate } from '../dto/user-update.dto';
import { JWTAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../user.entity';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AdminUpdate } from '../dto/admin-update.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { AuthUser } from '../user.decorator';

@Controller('profile')
@UseGuards(JWTAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  get(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User> {
    return this.userService.findOne({ where: { id } });
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatesUser: UserUpdate,
    @AuthUser() user: User,
  ): Promise<User> {
    if(+user.id !== +id && user.role != UserRoleEnum.ADMIN)
      throw new UnauthorizedException('You are not allowed to update this user!');

    return this.userService.update(id, updatesUser);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.ADMIN)
  updatePartial(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatesUser: AdminUpdate
  ): Promise<User> {
    return this.userService.update(id, updatesUser);
  }
}
