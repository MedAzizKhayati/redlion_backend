import { IsDefined, IsNotEmpty, MinLength } from "class-validator";

export class UpdatePass {
    constructor(password: string) {
        this.password = password;
    }

    @IsDefined()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}