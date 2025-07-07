import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Email must be a valid email address', })
    @IsNotEmpty({ message: 'Email is required', })
    email: string;

    @IsNotEmpty({ message: 'Password is required', })
    password: string;

    name: string;
    address: string;
}
