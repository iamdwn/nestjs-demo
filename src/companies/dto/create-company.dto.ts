import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty({ message: 'Name is required', })
    name: string;

    @IsNotEmpty({ message: 'Password is required', })
    address: string;

    @IsNotEmpty({ message: 'Description is required', })
    description: string;
}
