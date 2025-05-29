import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const isValid = this.usersService.checkPassword(pass, user?.password);
        if (user && isValid) {
            const { password, ...result } = user.toObject();
            return user;
        }
    
        return null;
    }
}
 