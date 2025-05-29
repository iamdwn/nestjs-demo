import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';
import { UsersModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
