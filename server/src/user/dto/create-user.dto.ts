import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20, {
        message: 'The name should be less than 21 symbols',
    })
    name: string;

    @IsString()
    @MinLength(6, {
        message: 'The password should be more than 6 symbols',
    })
    password: string;
}
