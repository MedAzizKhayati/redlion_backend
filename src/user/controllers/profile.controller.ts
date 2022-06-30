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
} from '@nestjs/common';

import { UserService } from '../user.service';
import { UserUpdate } from '../dto/user-update.dto';
import { JWTAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../user.entity';
import { RolesGuard } from '../../auth/guards/roles.guard';

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
  ): Promise<User> {
    return this.userService.update(id, updatesUser);
  }
}