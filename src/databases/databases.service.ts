import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-mongoose';
import { Permission, PermissionDocument } from '@/permissions/schemas/permission.schema';
import { Role, RoleDocument } from '@/roles/schemas/role.schema';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/users/users.service';

@Injectable()
export class DatabasesService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,

    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,

    private configService: ConfigService,
    private userService: UsersService
  ) { }

  onModuleInit() {
    console.log('DatabasesService initialized');
  }
}
