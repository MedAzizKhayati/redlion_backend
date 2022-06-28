import {
    Controller,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Param,
    ParseIntPipe,
    Put,
    Get,
    Query,
} from '@nestjs/common';

import { UserService } from '../user.service';
import { JWTAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../user.entity';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserStatusEnum } from '../enums/user-status.enum';

@Controller('users')
@UseGuards(JWTAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Put('approve/:id')
    @Roles(UserRoleEnum.ADMIN)
    async approve(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<User> {
        return this.userService.approve(id);
    }

    @Put('reject/:id')
    @Roles(UserRoleEnum.ADMIN)
    async reject(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<User> {
        return this.userService.reject(id);
    }

    @Get('all/:page?/:limit?')
    @Roles(UserRoleEnum.ADMIN)
    async findAll(
        @Param('page') page: number,
        @Param('limit') limit: number,
    ): Promise<User[]> {
        return this.userService.findAll(+page, +limit);
    }

    @Get('query/:page?/:limit?')
    @Roles(UserRoleEnum.ADMIN)
    async query(
        @Param('page') page: number,
        @Param('limit') limit: number,
        @Query('search') search: string,
        @Query('role') role: UserRoleEnum,
        @Query('status') status: UserStatusEnum,
    ): Promise<User[]> {
        return this.userService.query(+page, +limit, search, role, status);
    }

}
