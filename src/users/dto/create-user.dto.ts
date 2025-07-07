import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, Max, MaxLength, MinLength, Validate, ValidateNested } from 'class-validator';
import mongoose, { Types } from 'mongoose';
import { Type } from 'class-transformer';

class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
}

export class CreateUserDto {
    @IsEmail({}, { message: 'Email must be a valid email address', })
    @IsNotEmpty({ message: 'Email is required', })
    email: string;

    @IsNotEmpty({ message: 'Password is required', })
    password: string;

    @IsNotEmpty({ message: 'Name is required', })
    name: string;

    @IsNotEmpty({ message: 'Age is required', })
    age: number;

    @IsNotEmpty({ message: 'Gender is required', })
    gender: number;

    @IsNotEmpty({ message: 'Address is required', })
    address: string;

    @IsNotEmpty({ message: 'Role is required', })
    role: string;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company!: Company;
}
