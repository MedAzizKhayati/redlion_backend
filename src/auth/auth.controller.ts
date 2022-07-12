import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserRoleEnum } from 'src/user/enums/user-role.enum';

import { AuthUser } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { SecuredUpdatePass } from './dto/secured-update-password.dto';
import { SignUp } from './dto/sign-up.dto';
import { UpdatePass } from './dto/update-pass.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { Roles } from './roles.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  register(@Body() signUp: SignUp): Promise<User> {
    return this.authService.register(signUp);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<User> {
    return this.authService.login(email, password);
  }

  @Get('/me')
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }

  @Put('/update-password')
  @UseGuards(JWTAuthGuard)
  updateMyPassword(
    @AuthUser() user: User,
    @Body() securedUpdatedPass: SecuredUpdatePass
  ){
    return this.authService.checkPasswordAndUpdate(user.id, securedUpdatedPass);
  }

  @Put('/update-password/:id')
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  updatePassword(
    @Body() updatePass: UpdatePass,
    @Param('id' ,new ParseIntPipe()) id: number
  ){
    return this.authService.updatePassword(id, updatePass);
  }
}