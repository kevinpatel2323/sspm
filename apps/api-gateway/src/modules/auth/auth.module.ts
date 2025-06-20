import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CognitoService } from '../cognito/cognito.service';
import { RbacModule } from '../rbac/rbac.module';
import { UserTenantMapModule } from '../user-tenant-map/user-tenant-map.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [RbacModule, UserTenantMapModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, CognitoService],
})
export class AuthModule {}
