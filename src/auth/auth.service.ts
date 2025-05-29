import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const isValid = this.usersService.checkPassword(pass, user?.password);
        if (user && isValid) {
            const { password, ...result } = user.toObject();
            return user;
        }
    
        return null;
    }

    async login(user: any) {
        const payload = { 
            username: user.email, 
            sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
 