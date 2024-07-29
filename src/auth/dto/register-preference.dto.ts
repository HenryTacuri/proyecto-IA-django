import { Min, MinLength } from "class-validator";

export class RegiterPreferenceDto {

    @MinLength(3)
    make: string;

    @MinLength(3)
    model: string;

    @MinLength(3)
    fuel: string;

    @MinLength(3)
    color: string;

    @MinLength(3)
    shift: string;

    @Min(1000)
    price: number;

    @Min(1950)
    year: number;

    @Min(50)
    power: number;

    @Min(2)
    doors: number;

    @MinLength(3)
    idUser: string;

}