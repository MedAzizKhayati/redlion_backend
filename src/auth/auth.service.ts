import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/user.entity';
import { SignUp } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { UserStatusEnum } from 'src/user/enums/user-status.enum';
import { UpdatePass } from './dto/update-pass.dto';
import { SecuredUpdatePass } from './dto/secured-update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async updatePassword(id: number, updatePass: UpdatePass) {
    const user = await this.userService.update(id, updatePass);
    delete user.password;
    return user;
  }

  async checkPasswordAndUpdate(id: number, securedUpdatePass: SecuredUpdatePass){
    let user: User;
    try {
      user = await this.userService.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    if (!(await user.checkPassword(securedUpdatePass.oldPassword))) {
      throw new UnauthorizedException(
        `Wrong password for user with id: ${id}`,
      );
    }

    user = await this.userService.update(id, new UpdatePass(securedUpdatePass.newPassword));
    delete user.password;
    return user;
  }

  async register(signUp: SignUp): Promise<User> {
    const user = await this.userService.create(signUp);
    delete user.password;

    return user;
  }

  async login(email: string, password: string): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email } });
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    if (user.status === UserStatusEnum.PENDING) {
      throw new UnauthorizedException(
        `Your account is pending for approval. Please contact us for more information.`,
      );
    }

    if (user.status === UserStatusEnum.REJECTED) {
      throw new UnauthorizedException(
        `Your account has been rejected. Please contact us for more information.`,
      );
    }

    delete user.password;
    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email: payload.sub } });
      if (user.status !== UserStatusEnum.APPROVED)
        throw new UnauthorizedException(
          `Your account is ${user.status}! Please contact us for more information.`
        );
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
    delete user.password;

    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
