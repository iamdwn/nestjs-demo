import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {
        message: "Email must be a valid email address."})
    @IsNotEmpty({
        message: "Email is required."
    })
    email: string;

    @IsNotEmpty()
    password: string;


    name: string;
    address: string;
}
