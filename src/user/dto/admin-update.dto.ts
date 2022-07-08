import { IsString, IsNotEmpty, Min, Max, Matches, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserStatusEnum } from '../enums/user-status.enum';

export class AdminUpdate {

    @IsOptional()
    @IsString()
    @Matches(/[a-zA-Z .]{3,50}/)
    readonly name: string;
  
    @IsNumber()
    @Min(0)
    @IsOptional()
    readonly requestsRemaining: number;
  
    @IsOptional()
    @IsEnum(UserRoleEnum)
    readonly role: UserRoleEnum;

    @IsOptional()
    @IsEnum(UserStatusEnum)
    readonly status: UserStatusEnum;
  }
  