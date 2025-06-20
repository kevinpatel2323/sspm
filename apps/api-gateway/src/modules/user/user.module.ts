import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TenantModule } from '../tenant/tenant.module';
import { TenantService } from '../tenant/tenant.service';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.get<string>('USER_SERVICE_PKG', 'user'),
            protoPath: join(__dirname, './../../../libs/proto/user.proto'),
            url: configService.get<string>(
              'USER_SERVICE_URL',
              'localhost:5001',
            ),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    TenantModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
