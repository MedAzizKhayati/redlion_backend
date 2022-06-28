import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Validate,
  Matches,
} from 'class-validator';
import { IsUserAlreadyExist } from '../../user/is-user-already-exist.validator';

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  @Matches(/[a-zA-Z .]{3,40}/)
  readonly name: string;

  @IsDefined()
  @IsEmail()
  @Validate(IsUserAlreadyExist)
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
