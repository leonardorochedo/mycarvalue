import { Transform } from "class-transformer";
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsLatitude,
    IsLongitude,
    Min,
    Max
} from "class-validator";

export class GetEstimateDto {
    @IsNotEmpty({
        message: 'The report make should be not empty!'
    })
    @IsString({
        message: 'The report make should be a string!'
    })
    make: string;

    @IsNotEmpty({
        message: 'The report model should be not empty!'
    })
    @IsString({
        message: 'The report model should be a string!'
    })
    model: string;

    @Transform(({ value }) => parseInt(value)) // query params is a string values, we use a transform in this line to str => int
    @IsNotEmpty({
        message: 'The report year should be not empty!'
    })
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;
    
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty({
        message: 'The report longitude should be not empty!'
    })
    @IsLongitude({
        message: 'The report longitude should be a longitude!'
    })
    lng: number;
    
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty({
        message: 'The report latitude should be not empty!'
    })
    @IsLatitude({
        message: 'The report longitude should be a latitude!'
    })
    lat: number;

    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty({
        message: 'The report mileage should be not empty!'
    })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}