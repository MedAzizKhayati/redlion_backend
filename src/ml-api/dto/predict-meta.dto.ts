import { IsDefined, IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class PredictMetaDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly sector: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly objective: string;

    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    readonly amount: number;

    @IsDate()
    @IsNotEmpty()
    @IsDefined()
    readonly start_date: Date;
    
    @IsDate()
    @IsNotEmpty()
    @IsDefined()
    readonly end_date: Date;
}
