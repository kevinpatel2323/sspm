import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const isDocker = process.env.NODE_ENV === 'production';
          const serviceUrl = isDocker ? 'user-service:5001' : 'localhost:5001';

          return {
            transport: Transport.GRPC,
            options: {
              package: configService.get<string>('USER_SERVICE_PKG', 'user'),
              protoPath: join(__dirname, '../../../libs/proto/user.proto'),
              url: configService.get<string>('USER_SERVICE_URL', serviceUrl),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
