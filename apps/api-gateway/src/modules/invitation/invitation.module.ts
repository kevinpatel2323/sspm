import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { Invitation } from '@libs/entity/invitation.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RbacModule } from '../rbac/rbac.module';
import { CognitoModule } from '../cognito/cognito.module';
import { UtilsModule } from '../utils/utils.module';
import { DataSource } from 'typeorm';
import { EmailService } from '../utils/email.service';

@Module({
  imports: [
    ConfigModule, // Config module for environment variables
    TypeOrmModule.forFeature([Invitation], 'central_db'), // TypeORM configuration for the 'Invitation' entity
    RbacModule, // Role-based access control (RBAC) module
    CognitoModule, // Cognito authentication module
    UtilsModule, // Utility functions module

    // Registering the gRPC microservice client asynchronously
    ClientsModule.registerAsync([
      {
        name: 'INVITATION_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.get<string>(
              'INVITATION_SERVICE_PKG',
              'invitation',
            ),
            protoPath: join(
              __dirname,
              './../../../libs/proto/invitation.proto',
            ), // Path to the proto file
            url: configService.get<string>(
              'INVITATION_SERVICE_URL',
              'localhost:5002',
            ), // gRPC server URL
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [InvitationController],
  providers: [
    InvitationService,
    // {
    //   provide: 'InvitationRepository',  // Providing the InvitationRepository using the DataSource
    //   useFactory: (dataSource: DataSource) => dataSource.getRepository(Invitation),
    //   inject: [DataSource],
    // },
  ],
  exports: [InvitationService],
})
export class InvitationModule {}
