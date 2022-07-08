import { IsString, Matches } from 'class-validator';

export class UserUpdate {
  @IsString()
  @Matches(/[a-zA-Z .]{3,50}/)
  readonly name: string;
}
