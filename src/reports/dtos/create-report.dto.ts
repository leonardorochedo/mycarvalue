import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsLatitude,
    IsLongitude,
    Min,
    Max
} from "class-validator";

export class CreateReportDto {
    @IsNotEmpty({
        message: 'The report price should be not empty!'
    })
    @IsNumber()
    @Min(0)
    @Max(1000000000)
    price: number;

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

    @IsNotEmpty({
        message: 'The report year should be not empty!'
    })
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;
    
    @IsNotEmpty({
        message: 'The report longitude should be not empty!'
    })
    @IsLongitude({
        message: 'The report longitude should be a longitude!'
    })
    lng: number;
    
    @IsNotEmpty({
        message: 'The report latitude should be not empty!'
    })
    @IsLatitude({
        message: 'The report longitude should be a latitude!'
    })
    lat: number;

    @IsNotEmpty({
        message: 'The report mileage should be not empty!'
    })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}