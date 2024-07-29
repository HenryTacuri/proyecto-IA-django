import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsEmail() 
    email:      string;

    @IsString() 
    @MinLength(6) 
    name:       string;

    @MinLength(6) 
    password:   string;

}
