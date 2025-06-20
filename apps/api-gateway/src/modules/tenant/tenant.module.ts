import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';
// import { DatabaseModule } from '../database/database.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { KmsService } from 'src/services/kms.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Tenant], 'central_db'), // The second parameter 'central_db' specifying that this entity belongs to that specific database connection.
  ],
  controllers: [TenantController],
  providers: [
    TenantService,
    // KmsService,
  ],
  exports: [TenantService],
})
export class TenantModule {}
