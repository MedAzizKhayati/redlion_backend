import { IsDefined, IsNotEmpty, MinLength } from "class-validator";

export class SecuredUpdatePass {
    @IsDefined()
    @IsNotEmpty()
    @MinLength(8)
    readonly newPassword: string;

    @IsNotEmpty()
    @IsDefined()
    readonly oldPassword: string;
}