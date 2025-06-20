import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { Tenant } from './modules/tenant/tenant.entity';
import { UserTenantMap } from './modules/user-tenant-map/user-tenant-map.entity';
import { join } from 'path';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { UtilsModule } from './modules/utils/utils.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CognitoModule } from './modules/cognito/cognito.module';
import { UserTenantMapModule } from './modules/user-tenant-map/user-tenant-map.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { Invitation } from '@libs/entity/invitation.entity';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, './../../../.env'),
      cache: true,
      expandVariables: true,
    }),

    // Rate limiting configuration
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // Time window in mili seconds
        limit: 10, // Maximum number of requests within the time window
      },
    ]),

    // Central management database connection
    TypeOrmModule.forRoot({
      name: 'central_db',
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      port: process.env.PG_PORT
        ? parseInt(process.env.PG_PORT)
        : parseInt(process.env.PG_PORT || '5433'),
      username: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'postgres',
      database: process.env.PG_MANAGEMENT_DB || 'sspm_central_db',
      entities: [Tenant, UserTenantMap, Invitation],
      synchronize: true, // todo: Set to false in production
    }),

    // Redis connection
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: `redis://${configService.get('REDIS_HOST', 'localhost')}:${configService.get('REDIS_PORT', 6379)}`,
      }),
    }),

    UtilsModule,
    AuthModule,
    RbacModule,
    UserModule,
    TenantModule,
    CognitoModule,
    UserTenantMapModule,
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    console.log({
      PG_HOST: process.env.PG_HOST,
      PG_PORT: process.env.PG_PORT,
      PG_USER: process.env.PG_USER,
      PG_PASSWORD: process.env.PG_PASSWORD,
      PG_MANAGEMENT_DB: process.env.PG_MANAGEMENT_DB,
    });
  }
}
